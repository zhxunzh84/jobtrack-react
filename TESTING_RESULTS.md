# Testing Results

## Scope

Shared application integration for JobTrack, including routing, navigation, MockAPI requests, shared state, filtering, creation, deletion, refresh persistence, and error handling.

**Date:** 2026-09-28

## Automated Checks

| Check           | Result                               |
| --------------- | ------------------------------------ |
| `npm test`      | Passed: 10 tests across 3 test files |
| `npm run lint`  | Passed                               |
| `npm run build` | Passed                               |

### Automated Test Output

```text
Test Files  3 passed (3)
Tests       10 passed (10)
```

The automated suites use Vitest, React Testing Library, jsdom, jest-dom, and
user-event. Test-only code is kept in files ending with `.test.js` or `.test.jsx`
and is not placed inside `App.jsx`.

## Browser Verification

The application was tested through the Vite development server at `http://127.0.0.1:5173`.

| Scenario                        | Result                                                  |
| ------------------------------- | ------------------------------------------------------- |
| Open `/`                        | Redirected to `/applications`                           |
| Navigate to `/applications`     | Passed                                                  |
| Navigate to `/applications/new` | Passed                                                  |
| Shared navigation links         | Passed                                                  |
| MockAPI GET request             | Applications loaded successfully                        |
| Create an application           | New application appeared at the top of the list         |
| Filter by status                | Created application appeared under the `Applied` filter |
| Refresh after creation          | Created application remained in the list                |
| Delete an application           | Application was removed from the list                   |
| Refresh after deletion          | Deleted application remained absent                     |

## Failure Handling

| Scenario                             | Result                                                                                    |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| Simulated GET failure with HTTP 500  | `Failed to load applications` error state displayed                                       |
| Simulated POST failure with HTTP 500 | `Could not save this application. Please try again.` displayed and the form remained open |

## Architecture Confirmed

- Shared application state is owned by `App`.
- GET, POST, and DELETE MockAPI handlers are implemented in `App`.
- `localStorage` is not used as the primary persistence layer.
- `ApplicationsPage` and `AddApplicationPage` remain independent page components.
- `ApplicationList` and `ApplicationCard` composition is preserved.
- The MockAPI remains the source of truth across page navigation and refreshes.

## Automated Test Coverage

The automated tests are intentionally separated from the application implementation:

| Test file                                 | Coverage                                                                                     |
| ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| `src/utils/validateApplication.test.js`   | Validation unit tests for valid data, required fields, future dates, and ISO date formatting |
| `src/components/ApplicationForm.test.jsx` | Empty-form validation, trimmed submission values, and POST submission error feedback         |
| `src/pages/ApplicationsPage.test.jsx`     | Shared application rendering, status filtering, loading state, and GET error state           |

Test-only configuration is kept in `src/test/setup.js`, `vite.config.js`, and the test-specific ESLint configuration. Test commands are exposed through `npm test` and `npm run test:watch`.

## Notes

The POST and DELETE persistence checks used a temporary test record. The test record was deleted successfully and confirmed absent after refresh. Failure scenarios were tested by intercepting requests in the browser and returning HTTP 500 responses; normal network behavior was restored afterward.

The complete `App` fetch lifecycle is not yet covered by an automated `App.test.jsx`
suite. GET, POST, and DELETE integration behavior was verified manually in the
browser; component-level loading, filtering, validation, and error presentation
are covered by the automated tests above.
