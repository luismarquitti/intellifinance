---
sidebar_position: 3
title: "Issue Description"
description: 'Original JIRA issue description and test configuration'
---

# HPXAPPS-47475: Issue Description

## Issue Overview

**Status**: Development (In Progress) | **Priority**: High | **Type**: Bug  
**Assignee**: Luis Marquitti (luis.marquitti@hp.com)  
**Reporter**: Wanting Tang (wanting.tang@hp.com)  
**Created**: 2025-11-07 | **Updated**: 2025-11-08  
**Labels**: Beta2-RC, WinBetaPrint2  
**Fix Version**: 2025.11.A

---

## Problem Statement

After Windows migration flow completes, the "**Open HP Smart**" button displays instead of the expected "**Choose a printer**" button.

---

## Steps to Reproduce

1. Install the HP Smart App
2. Sign in to account and add test printer
3. Install the PROD build 50.52545.11077.0
4. Click **Learn More** → **Download now**
5. Wait for HPX APP to launch automatically
6. Click "**+ Add Device**" from top bar
7. Observe the button displayed

---

## Expected Result

The "**Choose a printer**" button should be displayed.

---

## Actual Result

The "**Open HP Smart**" button is displayed.

---

## Test Configuration

1. **OS Version**: ENU Win11 Pro 64bit 25H2 26200
2. **Build #**: 50.52545.11077.0
3. **Printer (model) name**: Trillium base - HP DeskJet 2900 series

---

## Additional Test Configurations (From QA)

### Configuration 2

- **OS**: Windows 11 26100
- **Build**: 50.52545.11152.0
- **Printer**: HP DeskJet 2900 series
- **Result**: Same issue

### Configuration 3

- **OS**: Windows 11 25H2 26200
- **Build**: 50.52545.451-467
- **Printer**: Various models
- **Result**: Same issue

---

## Workaround

None available.

---

## Impact Assessment

- **Severity**: HIGH - Production blocking issue
- **Scope**: ALL Windows users after migration
- **Frequency**: 100% reproducible in RC builds
- **User Impact**: Cannot access native printer setup
- **Business Impact**: Blocks RC release to production

---

## Related Builds

| Build Type | Build Number | Status |
|-----------|--------------|--------|
| RC (Broken) | 50.52545.11077.0 | ❌ Shows wrong button |
| RC (Broken) | 50.52545.11152.0 | ❌ Shows wrong button |
| RC (Broken) | 50.52545.451-467 | ❌ Shows wrong button |
| PROD (Working) | 51.52545.11178.0 | ✅ Shows correct button |

---

## Attachments

- `migration.mp4` - Video showing migration flow
- `LocalState.zip` - App state after migration
- `50.52545.11152.0.mp4` - RC build reproduction
- `51.52545.11178.mp4` - PROD build (working)
- Screenshots of UI states

---

## Links

- [JIRA Issue](https://jira.example.com/browse/HPXAPPS-47475)
- [Analysis Report](./index)
- [Feature Flags Evidence](./feature-flags-evidence)
- [Epic Comparison](./epic-comparison)
