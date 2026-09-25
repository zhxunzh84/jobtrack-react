# Phase 3 Progress: JobTrack

**Module 2 React Group Project — Core Feature Development**  
**Status:** Core feature development and shared integration are substantially complete. MockAPI GET, POST, and DELETE are integrated, both routes are connected, and the main create → list → filter → delete workflow has been manually verified.

## Phase 3 Objective

Build the core JobTrack features on the shared Vite/React setup: load, create, delete, and filter applications using MockAPI. Handle loading, empty, error, validation, and submission states, connect both pages through React Router, and verify the complete flow.

## Agreed Responsibilities

| Owner | Feature work |
| --- | --- |
| Johnson Zhang Xun | `ApplicationsPage`, `ApplicationList`, `ApplicationCard`, `/applications`, GET/DELETE, status filtering, and related loading/error states |
| Kenneth Kong Jin Quan | `AddApplicationPage`, `ApplicationForm`, `/applications/new`, controlled inputs, validation, POST, and submission feedback |
| Both | Shared state, routing/navigation, integration checks, styling integration, and teammate PR review |

The two feature areas were initially developed in parallel and later integrated through shared state and MockAPI request handlers in `App.jsx`.

## Shared Data Model

```json
{
  "id": "1",
  "company": "Citi",
  "jobTitle": "Application Support AVP",
  "status": "Applied",
  "appliedDate": "2026-09-20",
  "notes": "Applied through company website"
}
```

MockAPI generates `id`. Company, job title, status, and applied date are required; notes are optional. Dates use `YYYY-MM-DD`. Status is `Applied`, `Interview`, `Offer`, or `Rejected`, with `Applied` as the form default. `All` is a filter option, not a stored status.

## MockAPI Operations

| Method | Resource | Purpose | Current state |
| --- | --- | --- | --- |
| GET | `/applications` | Load applications | Integrated and verified |
| POST | `/applications` | Create an application | Integrated and verified |
| DELETE | `/applications/:id` | Delete an application | Integrated and verified |

All operations use the same MockAPI resource and shared field names. Editing existing applications remains outside the agreed scope.

## Current Component Structure

```text
src/
├── App.jsx
├── pages/
│   ├── ApplicationsPage.jsx
│   └── AddApplicationPage.jsx
├── components/
│   ├── ApplicationList.jsx
│   ├── ApplicationCard.jsx
│   └── ApplicationForm.jsx
└── utils/
    └── validateApplication.js
```

`App.jsx` owns the shared application collection, loading/error state, and MockAPI GET, POST, and DELETE handlers.

`ApplicationsPage` receives the shared data through props, owns the status filter state, and renders `ApplicationList`.

`ApplicationList` maps application records to `ApplicationCard`.

`AddApplicationPage` manages submission state and delegates controlled form input and validation to `ApplicationForm`.

## Shared State and Data Flow

```text
App mounts
→ GET /applications
→ setApplications(data)
→ ApplicationsPage receives applications
→ ApplicationList
→ ApplicationCard
```

Create flow:

```text
ApplicationForm
→ controlled form state
→ validation
→ AddApplicationPage
→ App.addApplication()
→ POST /applications
→ MockAPI returns created record
→ shared applications state updates
→ navigate to /applications
```

Delete flow:

```text
ApplicationCard
→ onDelete(id)
→ App.deleteApplication(id)
→ DELETE /applications/:id
→ shared applications state updates
→ record disappears from list
```

## Johnson — Applications List Feature

### Completed Work

- [x] Create `ApplicationCard.jsx`, `ApplicationList.jsx`, and `ApplicationsPage.jsx`.
- [x] Verify static-data rendering through the full component hierarchy.
- [x] Replace static data with MockAPI GET.
- [x] Add loading state.
- [x] Add GET request error state.
- [x] Add empty-list state.
- [x] Add DELETE using MockAPI.
- [x] Update the list after successful deletion.
- [x] Confirm deletion persists after page refresh.
- [x] Add status filtering for All, Applied, Interview, Offer, and Rejected.
- [x] Add no-match filter state.
- [x] Integrate `/applications` into React Router.
- [x] Preserve `ApplicationList` and `ApplicationCard` composition after shared integration.
- [x] Complete teammate-reviewed PRs and merge feature work into `main`.

### Remaining Check

- [ ] Confirm visible user feedback when a DELETE request fails.

The DELETE API handler rejects unsuccessful responses, but explicit UI feedback for a failed DELETE should be manually verified or added before marking this item complete.

## Kenneth — Add Application Feature

### Completed Work

- [x] Create `AddApplicationPage.jsx` and `ApplicationForm.jsx`.
- [x] Add controlled inputs for company, job title, status, applied date, and notes.
- [x] Validate required fields before submission.
- [x] Add POST using the shared MockAPI resource.
- [x] Use the record returned by MockAPI.
- [x] Show submission/loading state and prevent duplicate submissions while saving.
- [x] Show POST failure feedback.
- [x] Navigate back to `/applications` after successful creation.
- [x] Confirm a created application appears in the list.
- [x] Confirm the created application remains after page refresh.
- [x] Integrate `/applications/new` into React Router.
- [x] Complete teammate-reviewed feature work and merge into `main`.

Successful submission is currently indicated by navigation back to the applications list and display of the newly created record.

## Shared Integration Work

- [x] Configure `/applications` and `/applications/new`.
- [x] Add shared navigation links to both pages.
- [x] Redirect `/` to `/applications`.
- [x] Move shared application state into `App`.
- [x] Move MockAPI GET, POST, and DELETE request handlers into `App`.
- [x] Ensure both pages use the same application state and MockAPI source of truth.
- [x] Remove `localStorage` as the primary persistence layer.
- [x] Confirm a newly created application appears in the list and remains after refresh.
- [x] Confirm deletion updates the list and remains deleted after refresh.
- [x] Resolve overlapping `App.jsx` implementations from parallel feature development.
- [x] Move `AddApplicationPage` into its own page component.
- [x] Keep `ApplicationsPage` as an independent page component.
- [x] Preserve `ApplicationList` and `ApplicationCard` component composition.
- [x] Manually verify create → list → filter → delete.
- [x] Manually verify GET failure handling.
- [x] Manually verify POST failure handling.
- [x] Merge the shared MockAPI integration fix into `main`.

### Integration Verification

The integrated application has been manually verified for:

- MockAPI GET
- MockAPI POST
- MockAPI DELETE
- Application creation
- List rendering
- Status filtering
- Application deletion
- Create persistence after refresh
- Delete persistence after refresh
- GET failure/error state
- POST submission failure state
- Navigation between `/applications` and `/applications/new`
- Redirect to `/applications`
- Shared state ownership in `App`

## Git Workflow

```text
latest main
→ feature/fix branch
→ small commits
→ push
→ pull request
→ teammate review
→ merge to main
```

Feature development and integration used dedicated branches and pull requests. Shared-file conflicts caused by parallel work in `App.jsx` were resolved in a dedicated MockAPI integration fix.

The `fix/mockapi-integration` work was reviewed and merged into `main`.

Both members should continue pulling the latest `main` before further work.

## Current Progress

| Area | Confirmed state |
| --- | --- |
| Phase 2 | Complete |
| Johnson list feature | Core work complete |
| Kenneth add feature | Core work complete |
| MockAPI GET | Complete and verified |
| MockAPI POST | Complete and verified |
| MockAPI DELETE | Complete and verified |
| Routing/navigation | Complete |
| Shared state integration | Complete |
| Create → list → filter → delete | Verified |
| GET failure handling | Verified |
| POST failure handling | Verified |
| DELETE failure UI feedback | Still to verify |
| Integration PR | Reviewed and merged |
| Final verification by both members | Still to confirm |

## Remaining Work Before Closing Phase 3

The main feature implementation is complete. Remaining checks are limited to:

- [ ] Verify or add visible feedback when DELETE fails.
- [ ] Confirm Kenneth has pulled the final integrated `main` and verified the application locally.

No additional core feature development is currently required for Phase 3.

## Phase 3 Completion Criteria

- [x] `/applications` displays MockAPI records and handles loading, empty, and GET error states.
- [ ] Applications can be deleted, with visible failure feedback and persistence after refresh.
- [x] Status filtering works for All and each agreed status.
- [x] `/applications/new` displays a controlled form with required-field validation.
- [x] POST creates applications with saving and error handling.
- [x] Newly created applications appear in the list and persist after refresh.
- [x] Shared navigation reaches both routes, and `/` redirects to `/applications`.
- [x] The create → list → filter → delete flow works end to end.
- [x] Feature and integration branches have been reviewed by the teammate and merged into `main`.
- [ ] Both members have verified the final integrated application locally.

## After Phase 3

After the remaining verification checks are complete, proceed to final project work:

- refine responsive layout and presentation styling;
- complete deployment;
- update the README;
- add the required tools/AI disclosure;
- perform final manual regression testing;
- prepare screenshots;
- prepare the live demo;
- prepare presentation materials.

Styling refinement, deployment, README completion, and presentation preparation are outside the core Phase 3 feature-development scope.
