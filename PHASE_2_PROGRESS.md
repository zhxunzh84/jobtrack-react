# Phase 2 Progress: JobTrack

**Module 2 React Group Project — Project Scaffolding**  
**Status:** Complete. Shared project scaffolding and teammate environment verification are complete. Both members are ready to continue feature development from the latest `main`.

This records work confirmed in the project conversation, not a live check of GitHub.

## Completed Work

- Created the Vite React project inside the existing `jobtrack-react` repository, without creating a nested project. The existing Phase 1 proposal remained in place.
- Installed the project dependencies and verified the app locally with `npm run dev`.
- Replaced the default Vite UI with a minimal JobTrack shell displaying **JobTrack** and **Job Application Tracker**.
- Installed React Router using `npm install react-router`. Installation is complete; routes are not yet implemented.
- Committed and pushed the shared setup on `setup/vite-react`.
- Created [PR #3 — Setup Vite React project](https://github.com/zhxunzh84/jobtrack-react/pull/3), targeting `main`, and assigned Kenneth as reviewer.
- Kenneth approved PR #3, and Xun merged it into `main`. The merged setup includes the Vite React project, React Router dependency, initial JobTrack shell, and `PHASE_2_PROGRESS.md`.

## Files Added or Updated

The setup commit recorded these new files:

```text
.gitignore
eslint.config.js
index.html
package.json
package-lock.json
public/favicon.svg
public/icons.svg
src/App.jsx
src/index.css
src/main.jsx
vite.config.js
```

`README.md` was also modified. The React Router installation then updated `package.json` and `package-lock.json`. `node_modules/` is a local dependency folder, not a committed project file.

## Git Workflow and Evidence

The setup followed the agreed workflow: branch → commit → push → pull request → teammate review → merge. Kenneth's approval and the merge into `main` are now confirmed for PR #3.

| Item | Recorded evidence |
| --- | --- |
| Setup branch | Terminal output confirmed `setup/vite-react`. |
| First commit | `8d64914` — `Set up Vite React project`; terminal output showed 12 files changed and a successful push. |
| Second commit | `Install React Router`; this was the second setup commit before `PHASE_2_PROGRESS.md` was later added to the same branch. |
| Local run | Browser screenshots were shared and confirmed in the conversation: first the Vite React page, then the JobTrack shell. |
| Router dependency | Git status showed changes to `package.json` and `package-lock.json` after installation. |
| PR #3 | Initially contained the Vite setup and React Router commits. `PHASE_2_PROGRESS.md` was later added to the same branch before Kenneth's approval and the final merge into `main`. |

These checks confirm the initial setup and browser rendering. No production build, lint result, or automated test result was recorded.

## Agreed Responsibilities

| Owner | Feature work after shared setup |
| --- | --- |
| Johnson Zhang Xun | `ApplicationsPage`, `ApplicationList`, `ApplicationCard`, `/applications`, GET/DELETE requests, status filtering, and related loading/error states. |
| Kenneth Kong Jin Quan | `AddApplicationPage`, `ApplicationForm`, `/applications/new`, controlled inputs, validation, POST requests, and submission feedback. |
| Both | Shared state integration, routing/navigation, basic CSS, manual checks, deployment, README, and presentation. |

The shared scaffolding from the setup branch is now merged into `main`. Each member will implement their own feature work in a separate branch.

## Deferred to Phase 3 and Later

- Feature pages/components, route configuration, root redirect, and shared navigation.
- React integration with MockAPI: GET, POST, DELETE, shared application state, filtering, form validation, and loading/empty/error/submission feedback.
- Full feature checks, deployment, and final project documentation/presentation.

Earlier suggestions to create both feature pages were deferred to preserve the agreed ownership. React Router installation alone does not complete routing. The earlier Phase 1 MockAPI endpoint check does not mean the React app is connected to it.


## Phase 3 — Next Steps
1. Johnson creates `feature/applications-list` from the updated `main`:

   ```bash
   git checkout -b feature/applications-list
   ```

   Start the assigned `ApplicationsPage`, `ApplicationList`, `ApplicationCard`, `/applications`, GET/DELETE, status filtering, and loading/error work. Run `npm install` if dependencies have changed or are not installed, then use `npm run dev` for local verification.
2. Kenneth creates `feature/add-application-form` from the updated `main` and starts the add form, POST, validation, and submission feedback.
3. Coordinate changes to shared state and routing in `App.jsx`. Continue with small commits and separate PRs reviewed by the other member before merging.

## Phase 2 Completion Criteria

- [x] Vite React project has been created in the shared repository.
- [x] The app runs locally with `npm run dev`.
- [x] The default Vite demo has been replaced with the initial JobTrack app shell.
- [x] React Router has been installed.
- [x] The setup work was committed on a dedicated branch.
- [x] PR #3 was reviewed by Kenneth and merged into `main`.
- [x] Local `main` has been synced after the merge.
- [x] Kenneth has pulled the latest `main` and confirmed the project runs locally on his machine.
- [x] Both members are ready to create separate feature branches from the latest `main`.
