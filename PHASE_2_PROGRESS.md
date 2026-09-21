# Phase 2 Progress: JobTrack

**Module 2 React Group Project — Project Scaffolding**  
**Status:** In progress. Shared setup is complete on `setup/vite-react`; PR #3 is awaiting Kenneth's review and merge into `main` at the conversation cutoff.

This records work confirmed in the project conversation, not a live check of GitHub.

## Completed Work

- Created the Vite React project inside the existing `jobtrack-react` repository, without creating a nested project. The existing Phase 1 proposal remained in place.
- Installed the project dependencies and verified the app locally with `npm run dev`.
- Replaced the default Vite UI with a minimal JobTrack shell displaying **JobTrack** and **Job Application Tracker**.
- Installed React Router using `npm install react-router`. Installation is complete; routes are not yet implemented.
- Committed and pushed the shared setup on `setup/vite-react`.
- Created [PR #3 — Setup Vite React project](https://github.com/zhxunzh84/jobtrack-react/pull/3), targeting `main`, and assigned Kenneth as reviewer.

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

The setup followed the agreed workflow: branch → commit → push → pull request → teammate review → merge. Review and merge remain pending for PR #3 in this record.

| Item | Recorded evidence |
| --- | --- |
| Setup branch | Terminal output confirmed `setup/vite-react`. |
| First commit | `8d64914` — `Set up Vite React project`; terminal output showed 12 files changed and a successful push. |
| Second commit | `Install React Router`; included in the two-commit setup PR. |
| Local run | Browser screenshots were shared and confirmed in the conversation: first the Vite React page, then the JobTrack shell. |
| Router dependency | Git status showed changes to `package.json` and `package-lock.json` after installation. |
| PR #3 | The conversation recorded 2 commits, 12 changed files, Kenneth as reviewer, and GitHub's “Ready to merge” state. This does not mean approval or merge was completed. |

These checks confirm the initial setup and browser rendering. No production build, lint result, or automated test result was recorded.

## Agreed Responsibilities

| Owner | Feature work after setup merges |
| --- | --- |
| Johnson Zhang Xun | `ApplicationsPage`, `ApplicationList`, `ApplicationCard`, `/applications`, GET/DELETE requests, status filtering, and related loading/error states. |
| Kenneth Kong Jin Quan | `AddApplicationPage`, `ApplicationForm`, `/applications/new`, controlled inputs, validation, POST requests, and submission feedback. |
| Both | Shared state integration, routing/navigation, basic CSS, manual checks, deployment, README, and presentation. |

The setup branch contains shared scaffolding. Each member will implement their own feature work in a separate branch.

## Not Yet Done

- Kenneth's approval and merge of PR #3; local synchronization after that merge.
- Confirmation that Kenneth can install dependencies and run the app locally.
- Feature pages/components, route configuration, root redirect, and shared navigation.
- React integration with MockAPI: GET, POST, DELETE, shared application state, filtering, form validation, and loading/empty/error/submission feedback.
- Full feature checks, deployment, and final project documentation/presentation.

Earlier suggestions to create both feature pages were deferred to preserve the agreed ownership. React Router installation alone does not complete routing. The earlier Phase 1 MockAPI endpoint check does not mean the React app is connected to it.

## Next Steps After PR #3 Merge

1. Both members synchronize their local repository and verify the app:

   ```bash
   git checkout main
   git pull origin main
   npm install
   npm run dev
   ```

   Check that the Vite project files are present. `KENNETH_GIT_SETUP_CHECKLIST.md` will also arrive if PR #2 has already merged into `main`; that merge was not confirmed in this conversation.

2. Xun creates `feature/applications-list` from the updated `main` and starts the list, GET/DELETE, filtering, and loading/error work.
3. Kenneth creates `feature/add-application-form` from the updated `main` and starts the add form, POST, validation, and submission feedback.
4. Coordinate changes to shared state and routing in `App.jsx`. Continue with small commits and separate PRs reviewed by the other member before merging.
