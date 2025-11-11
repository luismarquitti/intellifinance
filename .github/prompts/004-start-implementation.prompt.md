---
description: Interactive prompt to analyze PLAN.md, identify next actions, and start implementation of tasks or phases with proper context and preparation.
---

# Start Implementation

**Purpose:** Intelligently analyze your project plan, identify ready-to-start work, and guide you through beginning implementation with full context.

---

## How This Works

1. **I'll read your PLAN.md** to understand the project state
2. **Analyze what's ready** to start (dependencies met, clear acceptance criteria)
3. **Present options** for what you could work on next
4. **Provide context** including specs, acceptance criteria, related files
5. **Help you start** with the right approach and checklist

---

## What I'll Look For

### Tasks Ready to Start (⬜ Not Started)
- All dependencies are ✅ Complete
- Acceptance criteria is clear
- No blockers preventing work
- Effort estimate seems reasonable

### Phases Ready to Begin
- Previous phase is ✅ Complete (if sequential)
- All prerequisite work is done
- Clear scope and goals

### Current Focus Area
- What's marked as "Current Task" or active focus
- What's 🚧 In Progress (should you continue it?)
- What's blocked ❌ (can we unblock it?)

---

## Instructions for Me

### Step 1: Read and Analyze PLAN.md

Read the PLAN.md file and identify:

1. **Current State:**
   - What phase/feature is active?
   - What tasks are 🚧 In Progress?
   - What tasks are ❌ Blocked?
   - Overall project health

2. **Ready to Start:**
   - Which tasks have dependencies met?
   - Which tasks are well-defined?
   - Which phases are ready to begin?

3. **Priorities:**
   - What's marked as "Current Task" or high priority?
   - What has upcoming deadlines?
   - What's critical path work?

4. **Context:**
   - Related SPEC IDs
   - Recent completions
   - Any warnings or notes

### Step 2: Check Dependencies

For each candidate task:
- ✅ Verify all dependencies are complete
- 📋 Check if SPEC exists and is approved (if referenced)
- 🏗️ Verify tech stack supports the work (from CODE-STATE.md if available)
- ⚠️ Identify any potential blockers

### Step 3: Present Options

Format:
```
🎯 Ready to Start - [X] Options Available

**Option 1: [Task Name]**
- Feature: [Feature Name]
- Phase: [Phase Name]
- Effort: [S/M/L/XL] ([hours estimate])
- Spec: SPEC-XXX (if applicable)
- Dependencies: [All met ✅ / List missing]
- Why start this: [Strategic reason - priority, blocks others, quick win, etc.]

**Option 2: [Task Name]**
[Same format...]

**Option 3: Continue In-Progress Work**
[If anything is 🚧]
- Task: [Name]
- Progress: ~[XX]% complete
- Why continue: [Avoid context switching, nearly done, etc.]

**Option 4: Unblock Blocked Work**
[If anything is ❌]
- Task: [Name]
- Blocker: [Issue]
- How to unblock: [Suggested action]

**Option 5: Start Next Phase**
[If current phase complete and next phase ready]
- Phase: [Name]
- Tasks: [Count] tasks, [total effort]
- Why start: [Phase goals and value]
```

Ask user: "Which option would you like to start? (Type 1-5 or 'analyze' for more detail)"

### Step 4: Provide Context for Selected Option

Once user chooses, provide:

1. **Full Task Details:**
   ```
   📋 Task: [Full description]
   
   **Acceptance Criteria:**
   - [Criterion 1]
   - [Criterion 2]
   
   **Effort Estimate:** [S/M/L/XL] ([hours])
   
   **Dependencies Met:**
   ✅ [Dependency 1]
   ✅ [Dependency 2]
   
   **Related Spec:** SPEC-XXX
   [Summarize relevant spec requirements if available]
   
   **Files Likely Affected:**
   [Best guess based on task description and project structure]
   ```

2. **Pre-Implementation Checklist:**
   ```
   Before Starting:
   - [ ] Read related SPEC (SPEC-XXX) if exists
   - [ ] Review acceptance criteria carefully
   - [ ] Understand dependencies and context
   - [ ] Estimate is reasonable (confirm or adjust)
   - [ ] No hidden blockers
   
   Ready to start? (yes/no)
   ```

3. **If user confirms "yes":**
   ```
   ✅ Starting: [Task Name]
   
   **Next Steps:**
   1. Mark task as 🚧 In Progress in PLAN.md
   2. Update "Current Task" section if present
   3. Run implementation prompt: feat-imp-with-detailed-output.prompt.md
   4. Keep TODO.md handy for quick notes
   
   Would you like me to:
   A) Update PLAN.md to mark this task in progress
   B) Launch feat-imp-with-detailed-output.prompt.md with context
   C) Just show me the task details again
   D) All done, I'll handle it from here
   
   Type A/B/C/D:
   ```

### Step 5: Execute User's Choice

**If A (Update PLAN.md):**
- Change task status from ⬜ to 🚧
- Update "Current Task" section if present
- Show confirmation with the exact change made

**If B (Launch implementation):**
- Provide context package for feat-imp-with-detailed-output.prompt.md:
  ```
  Context for Implementation:
  
  Task: [Name]
  From: PLAN.md > [Feature] > [Phase]
  
  Requirements:
  [Paste acceptance criteria]
  
  Related Spec: SPEC-XXX
  [Key requirements from spec]
  
  Approach:
  [Suggested approach based on task description]
  
  Estimated Effort: [hours]
  
  Ready to proceed with Phase 1 (Analysis)?
  ```

**If C (Show details):**
- Re-display full task context from Step 4

**If D (User handles):**
- Provide quick reminder:
  ```
  ✅ You're all set!
  
  **Remember:**
  - Mark task 🚧 in PLAN.md when you start
  - Refer to acceptance criteria during implementation
  - Update TODO.md with any quick notes
  - Run state-analyzer.prompt.md when done
  
  Good luck! 🚀
  ```

---

## Special Cases

### No Tasks Ready

If no tasks meet "ready to start" criteria:

```
⚠️ No tasks are currently ready to start.

**Issues Found:**
1. Task X depends on Task Y (not complete)
2. Task Z has no acceptance criteria defined
3. Phase A blocked by [blocker]

**Recommended Actions:**
1. Complete blocking tasks first
2. Refine task definitions with plan-generator.prompt.md
3. Address blockers documented in CODE-STATE.md

Would you like me to:
A) Show tasks that are closest to ready (1 dependency away)
B) Help unblock blocked tasks
C) Identify tasks with missing acceptance criteria

Type A/B/C:
```

### Everything Complete

If all tasks are ✅:

```
🎉 Congratulations! All planned tasks are complete.

**Next Steps:**
1. Run alignment-checker.prompt.md to verify PLAN matches CODE-STATE
2. Run changelog-updater.prompt.md to document this phase
3. Run control-files-reviewer.prompt.md for quality check
4. Consider planning next phase or feature

Would you like me to:
A) Check alignment between PLAN and CODE-STATE
B) Review what was completed this phase
C) Help plan the next phase

Type A/B/C:
```

### Multiple In-Progress Tasks

If >3 tasks are 🚧:

```
⚠️ Warning: Multiple tasks in progress ([X] tasks)

**In Progress:**
- Task 1: [Name]
- Task 2: [Name]
- Task 3: [Name]
[...]

**Recommendation:** Focus on completing one task before starting new work.

Would you like to:
A) See details of in-progress tasks (choose one to complete)
B) Mark some as ⬜ Not Started (reprioritize)
C) Proceed with starting new work anyway

Type A/B/C:
```

---

## Integration with Other Prompts

**Before Starting Implementation:**
- This prompt (start-implementation.prompt.md) ← **You are here**

**During Implementation:**
- feat-imp-with-detailed-output.prompt.md (gated implementation)
- Keep TODO.md updated with notes

**After Implementation:**
- state-analyzer.prompt.md (update CODE-STATE)
- alignment-checker.prompt.md (verify sync)
- changelog-updater.prompt.md (document changes)

---

## Tips for Best Results

1. **Keep PLAN.md Updated:**
   - Mark tasks as ✅ when complete
   - Update 🚧 status actively
   - Document blockers immediately

2. **Use Effort Estimates:**
   - S (1-2 hours) - good for quick wins
   - M (2-3 hours) - substantial task
   - L (3-4 hours) - significant work
   - XL (>4 hours) - consider breaking down

3. **Check Dependencies:**
   - Tasks with unmet dependencies can't start
   - Update PLAN.md when dependencies complete

4. **Leverage Specs:**
   - If SPEC exists, read it first
   - Specs provide critical context
   - Use spec-writer.prompt.md if spec is unclear

5. **Regular Rhythm:**
   - Use this prompt at start of each work session
   - Helps maintain focus and priorities
   - Prevents "what should I do next?" paralysis

---

## Example Session

```
User: [Runs start-implementation.prompt.md]

Agent:
Reading PLAN.md...

📊 Project: E-commerce Analytics Dashboard
🎯 Current Phase: Phase 2 - Core Features (In Progress)
✅ Completed: 8 tasks
🚧 In Progress: 1 task
⬜ Ready to Start: 5 tasks
❌ Blocked: 0 tasks

---

🎯 Ready to Start - 5 Options Available

**Option 1: Implement WebSocket Connection**
- Feature: Real-time Sales Dashboard
- Phase: Phase 2, Task 3
- Effort: L (3-4 hours)
- Spec: SPEC-002
- Dependencies: All met ✅ (Dashboard UI complete, API ready)
- Why start this: 🔴 Critical blocker - unblocks real-time metrics
- Priority: HIGH

**Option 2: Add Error Boundaries to Charts**
- Feature: Real-time Sales Dashboard
- Phase: Phase 2, Task 5
- Effort: S (1-2 hours)
- Spec: SPEC-002
- Dependencies: All met ✅
- Why start this: Quick win, improves stability
- Priority: MEDIUM

**Option 3: Build Custom Report Builder UI**
- Feature: Custom Report Builder
- Phase: Phase 1, Task 1
- Effort: M (2-3 hours)
- Spec: SPEC-004
- Dependencies: All met ✅
- Why start this: Lower priority, can defer
- Priority: LOW

**Option 4: Continue In-Progress Work**
- Task: Product Performance Analytics - Data Aggregation
- Feature: Product Performance Analytics
- Progress: ~60% complete
- Why continue: Nearly done, avoid context switch
- Remaining: ~1-2 hours

**Option 5: Start Phase 3 - Polish**
- Not ready yet (Phase 2 not complete: 5/8 tasks done)
- Estimated 2 more days before ready

---

Which option would you like to start? (Type 1-5 or 'analyze' for more detail)

User: 1

Agent:
📋 Task: Implement WebSocket Connection

**Full Description:**
Establish WebSocket connection to backend for real-time data streaming. 
Handle connection lifecycle (connect, reconnect, disconnect), message parsing, 
and integration with Redux store for live dashboard updates.

**Acceptance Criteria:**
- WebSocket connects to backend on dashboard mount
- Connection auto-reconnects on failure (exponential backoff)
- Messages parsed and dispatched to Redux store
- Connection closes cleanly on component unmount
- Error handling for malformed messages
- Test coverage >80%

**Effort Estimate:** L (3-4 hours)

**Dependencies Met:**
✅ Dashboard UI component complete
✅ Redux store configured
✅ Backend WebSocket endpoint available
✅ Message protocol defined in SPEC-002

**Related Spec: SPEC-002 - Real-time Sales Dashboard**
Key Requirements:
- REQ-002-F-003: System SHALL establish WebSocket connection for real-time updates
- REQ-002-F-004: System SHALL display live data within 2 seconds of backend event
- REQ-002-NF-001: Connection MUST handle network interruptions gracefully

**Files Likely Affected:**
- src/services/websocketService.ts (new)
- src/hooks/useWebSocket.ts (new)
- src/features/dashboard/SalesDashboard.tsx (modify)
- src/store/dashboardSlice.ts (modify)
- tests/websocketService.test.ts (new)

**Technical Approach:**
1. Create WebSocket service with connection management
2. Implement reconnection logic with exponential backoff
3. Create React hook for components to use WebSocket
4. Integrate with existing Redux slice
5. Add comprehensive error handling
6. Write unit and integration tests

---

✅ Before Starting:
- [ ] Read SPEC-002 section on real-time requirements
- [ ] Review WebSocket protocol documentation (check docs/)
- [ ] Confirm backend endpoint URL and authentication
- [ ] Verify Redux store structure is ready
- [ ] No hidden blockers

Ready to start? (yes/no)

User: yes

Agent:
✅ Starting: Implement WebSocket Connection

**Next Steps:**
1. Mark task as 🚧 In Progress in PLAN.md
2. Update "Current Task" section
3. Run implementation prompt: feat-imp-with-detailed-output.prompt.md
4. Keep TODO.md handy for quick notes

Would you like me to:
A) Update PLAN.md to mark this task in progress
B) Launch feat-imp-with-detailed-output.prompt.md with context
C) Just show me the task details again
D) All done, I'll handle it from here

Type A/B/C/D:

User: B

Agent:
🚀 Launching Implementation with Context

---

**Context Package for feat-imp-with-detailed-output.prompt.md:**

Task: Implement WebSocket Connection
From: PLAN.md > Real-time Sales Dashboard > Phase 2

**Requirements (from SPEC-002):**
- Establish WebSocket connection for real-time data streaming
- Auto-reconnect on failure with exponential backoff
- Parse messages and update Redux store
- Clean connection lifecycle management
- Error handling for malformed messages
- Test coverage >80%

**Acceptance Criteria:**
1. WebSocket connects on dashboard mount
2. Auto-reconnects on failure (exponential backoff)
3. Messages parsed and dispatched to Redux store
4. Connection closes cleanly on unmount
5. Error handling for malformed messages
6. Test coverage >80%

**Technical Context:**
- Backend endpoint: wss://api.example.com/realtime
- Authentication: JWT token from auth store
- Message format: JSON with { type, payload }
- Redux slice: dashboardSlice with actions for data updates

**Approach:**
1. Create websocketService.ts with connection management
2. Implement useWebSocket.ts React hook
3. Integrate with SalesDashboard component
4. Update dashboardSlice with WebSocket actions
5. Write comprehensive tests

**Estimated Effort:** 3-4 hours

---

Ready to proceed with **Phase 1: Analysis**?

[Implementation prompt continues with gated workflow...]
```

---

## Validation Rules

Before presenting options, verify:

1. ✅ PLAN.md exists and is readable
2. ✅ At least one task is defined
3. ✅ Tasks have clear descriptions
4. ✅ Effort estimates are present (or note if missing)
5. ✅ Dependencies are trackable

If validation fails:
```
❌ Cannot analyze PLAN.md

**Issue:** [Specific problem]

**Solution:**
- If PLAN.md doesn't exist: Run workflow-bootstrap.prompt.md
- If PLAN.md is malformed: Run control-files-reviewer.prompt.md
- If tasks unclear: Run plan-generator.prompt.md to refine

Would you like help with any of these?
```

---

## Success Criteria

This prompt succeeds when:

1. ✅ User clearly understands what work is ready to start
2. ✅ User has full context for chosen task
3. ✅ User smoothly transitions to implementation
4. ✅ PLAN.md is updated to reflect new work state
5. ✅ No ambiguity about next actions

---

**Related Prompts:**
- plan-generator.prompt.md - Create/refine plans
- feat-imp-with-detailed-output.prompt.md - Gated implementation
- state-analyzer.prompt.md - Update state after work
- alignment-checker.prompt.md - Verify sync
- control-files-reviewer.prompt.md - Quality check

**Back to Workflow:** [spec-driven-workflow.md](../../doc/workflows/spec-driven-workflow.md)
