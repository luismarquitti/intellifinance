---
sidebar_position: 5
title: "Quick Reference"
description: 'Quick reference guide for developers working on this issue'
---

# Quick Reference - HPXAPPS-47475

## TL;DR

**Problem**: Windows migration shows "Open HP Smart" instead of "Choose a printer"

**Root Cause**: LaunchDarkly prerequisite evaluation issue + hardcoded `false` values in parent component

**Quick Fix**: Revert to react-adddevice-mfe v1.4.4

**Proper Fix**: Investigate LaunchDarkly rules and fix flag evaluation

---

## Key Files

### Primary Issue

```text
src/screens/AddDevice/index.tsx
  Lines 94-97: Bug location (hardcoded false values)
```

### Related Files

```text
src/containers/AddPrinterCard/index.tsx
  Lines 272-278: Decision logic

src/constants.ts
  Feature flag constant definitions
```

---

## Critical Code Locations

### Bug Location (Parent Component)

**File**: `src/screens/AddDevice/index.tsx` (Lines 94-97)

```typescript
// ❌ CURRENT (BROKEN)
<AddPrinterCard
  hasAddPrinterAA={false}
  hasAddNetworkPrinter={false}          // Hardcoded
  hasAddPrinterWin={false}              // Hardcoded
  hasEnableSMBPrinterSetup={false}      // Hardcoded
  togglePanelVisibility={togglePanelVisibility}
/>

// ✅ SHOULD BE
<AddPrinterCard
  hasAddPrinterAA={false}
  hasAddNetworkPrinter={hasAddNetworkPrinter}
  hasAddPrinterWin={hasAddPrinterWin}
  hasEnableSMBPrinterSetup={hasEnableSMBPrinterSetup}
  togglePanelVisibility={togglePanelVisibility}
/>
```

### Decision Logic (Child Component)

**File**: `src/containers/AddPrinterCard/index.tsx` (Lines 272-278)

```typescript
const isWindows = isWindowsPlatform();
const hasAvailableActions = Boolean(
  hasAddPrinterWin || hasAddPrinterAA || hasAddNetworkPrinter
);
const showOriginalCard = !isWindows || hasAvailableActions;
```

---

## Feature Flags

### LaunchDarkly Flags

| Flag Name | Purpose | Expected Value (Post-Migration) |
|-----------|---------|----------------------------------|
| `devices-x-add-setupprinter` | AA printer setup | FALSE (not used for Windows) |
| `devices-x-add-devicesupport` | Windows native setup | TRUE (migration users) |
| `devices-x-add-networkprinter` | Network printer | FALSE (not enabled) |
| `devices-x-adddevice-smbprinter` | SMB printer setup | TRUE (migration users) |

### Prerequisite Rules

`devices-x-add-setupprinter` returns TRUE only when ALL are TRUE:

- `devices-x-core` is ON
- `devices-x-adddevice` is ON
- `migratedUser` is ON

---

## Debug Commands

### Check Feature Flags in Browser Console

```javascript
// Access the experience toggle API
window.experienceToggle.v2.check({ key: 'devices-x-add-setupprinter' })
window.experienceToggle.v2.check({ key: 'devices-x-add-devicesupport' })
window.experienceToggle.v2.check({ key: 'devices-x-add-networkprinter' })
window.experienceToggle.v2.check({ key: 'devices-x-adddevice-smbprinter' })
```

### Check Component State

Add to `AddDevice/index.tsx` before render:

```typescript
console.log('AddDevice Debug:', {
  isWindows: isWindowsPlatform(),
  hasAddPrinterWin,
  hasAddPrinterAA,
  hasAddNetworkPrinter,
  hasEnableSMBPrinterSetup,
});
```

---

## Testing Scenarios

### Test Case 1: Post-Migration Windows User

**Setup**:

1. Install HP Smart App
2. Add printer
3. Install RC build
4. Trigger migration

**Expected**: "Choose a printer" button  
**Actual (Broken)**: "Open HP Smart" button

**Flag States**:

- `hasAddPrinterWin` should be TRUE
- Currently receiving FALSE

### Test Case 2: PROD Build Verification

**Setup**:

1. Same as Test Case 1
2. Use PROD build 51.52545.11178

**Expected**: "Choose a printer" button  
**Actual**: ✅ WORKS (uses v1.4.4)

---

## Version Comparison

| Version | Status | Notes |
|---------|--------|-------|
| v1.4.4 | ✅ WORKS | PROD build - has defensive logic |
| v1.4.10 | ❌ BROKEN | RC builds - removed defensive logic |

---

## Emergency Fix Steps

### Option 1: Rollback (Immediate)

```bash
# Revert react-adddevice-mfe to v1.4.4
npm install react-adddevice-mfe@1.4.4
```

### Option 2: Code Patch (Quick)

**File**: `src/screens/AddDevice/index.tsx`

Replace lines 94-97 with correct prop passing (see Bug Location above).

### Option 3: Investigate LaunchDarkly (Proper Fix)

1. Check LaunchDarkly dashboard for `devices-x-add-setupprinter` rules
2. Verify prerequisite flags are ON in RC environment
3. Check if `migratedUser` is set correctly during migration
4. Test flag caching and refresh behavior

---

## Related Documentation

- [Full Analysis Report](./index)
- [Feature Flags Evidence](./feature-flags-evidence)
- [Epic Comparison](./epic-comparison)
- [Issue Description](./issue-description)

---

## Contact

**Assignee**: Luis Marquitti  
**QA Team**: Wanting Tang  
**Repository**: react-adddevice-mfe  
**JIRA**: HPXAPPS-47475
