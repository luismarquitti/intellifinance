---
sidebar_position: 2
title: "Feature Flags Evidence"
description: 'Detailed feature flag values and component prop analysis'
---

# Feature Flags Evidence - HPXAPPS-47475

**Date**: 2025-11-08  
**Source**: Browser console check via experienceToggle API  
**Build**: RC 50.52545.11152.0 (BROKEN)

---

## 🎯 SMOKING GUN EVIDENCE

### Feature Flag Values from System

**Actual values from `@clientos/experience-toggle-northbound-api`:**

```json
{
  "devices-x-add-devicesupport": true,     // ✅ Windows printer setup ENABLED
  "devices-x-add-networkprinter": false,   // ❌ Network printer DISABLED
  "devices-x-add-printer": false,          // ❌ Not used in codebase
  "devices-x-add-setupprinter": false,     // ❌ AA printer setup DISABLED
  "devices-x-adddevice": true,             // ✅ Add device ENABLED
  "devices-x-adddevice-smbprinter": true,  // ✅ SMB printer ENABLED
  "support-x-adddevice": true              // ✅ Add device support ENABLED
}
```

### Component Props Received

**Values passed to AddPrinterCard component:**

```json
{
  "hasAddPrinterWin": false,               // ❌ WRONG! Should be TRUE
  "hasAddPrinterAA": false,                // ✅ Correct (flag is false)
  "hasAddNetworkPrinter": false,           // ✅ Correct (flag is false)
  "hasEnableSMBPrinterSetup": false        // ❌ WRONG! Should be TRUE
}
```

---

## 💥 THE PROOF

### Feature Flag → Prop Mapping

| Feature Flag | System Value | Expected Prop | Actual Prop | Status |
|--------------|--------------|---------------|-------------|--------|
| `devices-x-add-devicesupport` | ✅ **TRUE** | `hasAddPrinterWin = true` | ❌ **FALSE** | **BROKEN** |
| `devices-x-add-setupprinter` | ❌ FALSE | `hasAddPrinterAA = false` | ✅ FALSE | CORRECT |
| `devices-x-add-networkprinter` | ❌ FALSE | `hasAddNetworkPrinter = false` | ✅ FALSE | CORRECT |
| `devices-x-adddevice-smbprinter` | ✅ **TRUE** | `hasEnableSMBPrinterSetup = true` | ❌ **FALSE** | **BROKEN** |

**CRITICAL FINDING**: 

- Feature toggles ARE working correctly ✅
- Hooks ARE calling the correct APIs ✅
- Parent component IS receiving correct values ✅
- **BUT parent component HARDCODES them to FALSE** ❌

---

## 🔍 The Smoking Gun

### Code Location: `src/screens/AddDevice/index.tsx`

**Lines 19-23**: Feature flags correctly loaded via hooks:

```typescript
const hasAddPrinterWin = useAddPrinterWinContextData();  
// Returns TRUE (from devices-x-add-devicesupport)

const hasAddPrinterAA = useAddPrinterAAContextData();
// Returns FALSE (from devices-x-add-setupprinter)

const hasAddNetworkPrinter = useAddNetworkPrinterContextData();
// Returns FALSE (from devices-x-add-networkprinter)

const hasEnableSMBPrinterSetup = useEnableSMBPrinterSetupContextData();
// Returns TRUE (from devices-x-adddevice-smbprinter)
```

**Lines 81-88**: When `hasAddPrinterAA === false`, FIRST branch (NOT taken):

```typescript
{hasAddPrinterAA ? (  // FALSE, so this branch is SKIPPED
  <>
    <AddPrinterCard
      hasAddPrinterWin={hasAddPrinterWin}  // Would pass TRUE ✅
      hasAddNetworkPrinter={hasAddNetworkPrinter}  // Would pass FALSE ✅
      hasEnableSMBPrinterSetup={hasEnableSMBPrinterSetup}  // Would pass TRUE ✅
    />
  </>
```

**Lines 93-99**: When `hasAddPrinterAA === false`, SECOND branch (TAKEN - THIS IS THE BUG):

```typescript
) : (  // This branch executes because hasAddPrinterAA is FALSE
  <>
    <AddPrinterCard
      hasAddPrinterAA={false}
      hasAddNetworkPrinter={false}          // ❌ Should be {hasAddNetworkPrinter}
      hasAddPrinterWin={false}              // ❌ Should be {hasAddPrinterWin}
      hasEnableSMBPrinterSetup={false}      // ❌ Should be {hasEnableSMBPrinterSetup}
    />
  </>
)}
```

---

## 📊 The Complete Chain

### 1. Feature Toggle System

```text
devices-x-add-devicesupport = TRUE ✅
     ↓
experienceToggle.v2.check({key: 'devices-x-add-devicesupport'})
     ↓
Returns: TRUE ✅
```

### 2. Hook Layer

```typescript
useAddPrinterWinContextData()
     ↓
features.hasFeature('devices-x-add-devicesupport')
     ↓
Returns: TRUE ✅
```

### 3. Parent Component (AddDevice)

```typescript
const hasAddPrinterWin = useAddPrinterWinContextData();
// hasAddPrinterWin = TRUE ✅

const hasAddPrinterAA = useAddPrinterAAContextData();
// hasAddPrinterAA = FALSE ✅
```

### 4. Conditional Logic (THE BUG)

```typescript
{hasAddPrinterAA ? (  // FALSE, so takes else branch
  // Branch A: Passes actual values (NOT EXECUTED)
) : (
  // Branch B: Hardcodes to false (EXECUTED) ❌
  <AddPrinterCard
    hasAddPrinterWin={false}  // ❌ IGNORES the TRUE value from hook!
  />
)}
```

### 5. Child Component (AddPrinterCard)

```typescript
// Receives:
hasAddPrinterWin = false  // ❌ Should be TRUE

// Computes:
hasAvailableActions = hasAddPrinterWin || hasAddPrinterAA || hasAddNetworkPrinter
                    = false || false || false
                    = false  // ❌ WRONG

// Decides:
showOriginalCard = !isWindows || hasAvailableActions
                 = !true || false
                 = false  // ❌ WRONG - hides native UI

// Shows:
willShowHpSmartButton = true  // ❌ WRONG - shows HP Smart fallback
```

---

## 🎯 Root Cause Summary

### What Should Happen

1. Feature flag `devices-x-add-devicesupport` = TRUE ✅
2. Hook returns TRUE ✅
3. Parent passes TRUE to child ✅
4. Child shows "Choose a printer" button ✅

### What Actually Happens

1. Feature flag `devices-x-add-devicesupport` = TRUE ✅
2. Hook returns TRUE ✅
3. Parent **HARDCODES FALSE** to child ❌
4. Child shows "Open HP Smart" button ❌

**The Bug**: Parent component at line 97 ignores the actual feature toggle value and hardcodes `{false}`.

---

## 🔧 The Fix

**File**: `src/screens/AddDevice/index.tsx`  
**Lines**: 94-97

### Change from

```typescript
<AddPrinterCard
  hasAddPrinterAA={false}
  hasAddNetworkPrinter={false}          // ❌ Hardcoded
  hasAddPrinterWin={false}              // ❌ Hardcoded
  hasEnableSMBPrinterSetup={false}      // ❌ Hardcoded
  togglePanelVisibility={togglePanelVisibility}
/>
```

### Change to

```typescript
<AddPrinterCard
  hasAddPrinterAA={false}
  hasAddNetworkPrinter={hasAddNetworkPrinter}          // ✅ Use actual value
  hasAddPrinterWin={hasAddPrinterWin}                  // ✅ Use actual value
  hasEnableSMBPrinterSetup={hasEnableSMBPrinterSetup}  // ✅ Use actual value
  togglePanelVisibility={togglePanelVisibility}
/>
```

### Result After Fix

```typescript
// Values passed to AddPrinterCard:
hasAddPrinterWin = TRUE  // ✅ From feature flag
hasAddPrinterAA = FALSE  // ✅ From feature flag
hasAddNetworkPrinter = FALSE  // ✅ From feature flag
hasEnableSMBPrinterSetup = TRUE  // ✅ From feature flag

// Computed:
hasAvailableActions = true || false || false = TRUE  // ✅

// Decided:
showOriginalCard = !true || true = false || true = TRUE  // ✅

// Shows:
"Choose a printer" button  // ✅ CORRECT!
```

---

## 📈 Confidence Level

**Before this evidence**: 95% (based on code analysis and debug logs)  
**After this evidence**: **100%** (feature flag values confirm exact root cause)

This is ABSOLUTE PROOF that the parent component bug is the root cause.

---

**Next Action**: Apply the fix to `src/screens/AddDevice/index.tsx` line 94-97
