# StudyFlow — Study Task Manager

A responsive React application for tracking study assignments, deadlines, priorities, and progress. The project uses React Router, a simulated asynchronous API, and browser storage.

## Features

- Nested React Router routes with a shared navigation layout
- Task creation, editing, deletion, and status changes
- Search, subject/status/priority filters, sorting, and pagination
- URL query parameters synchronized with list filters
- Dynamic task detail and edit pages using `useParams`
- Dashboard with five computed statistics and two data breakdowns
- Subject analytics and dedicated completed, overdue, and high-priority views
- Loading, error, empty, and success feedback
- Protection against stale detail requests using effect cleanup
- Lazy-loaded pages with `React.lazy` and `Suspense`
- Responsive UI and a custom 404 page
- Fake API with random delays, simulated errors, and persistence in `localStorage`

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/login` | Login placeholder |
| `/tasks` | Task list with URL filters |
| `/tasks/new` | Create task |
| `/tasks/:id` | Task details |
| `/tasks/:id/edit` | Edit task |
| `/tasks/completed` | Completed tasks |
| `/tasks/overdue` | Overdue tasks |
| `/tasks/high-priority` | High-priority tasks |
| `/dashboard` | Dashboard |
| `/dashboard/subjects` | Subject analytics |
| `*` | Custom 404 page |

## Technology

- React 18
- React Router 6 (`react-router-dom`)
- Vite 6
- JavaScript, HTML, CSS
- Fake API using Promises and `localStorage`

## Run locally

Install Node.js, open a terminal in the project folder, and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

To verify the production build:

```bash
npm run build
npm run preview
```

## Architecture

```text
src/
  App.jsx                    Route declarations
  main.jsx                   React and HashRouter entry point
  layouts/                   RootLayout, TasksLayout, DashboardLayout
  pages/                     Individual route pages
  components/                NavBar, TaskCard, TaskForm, loading and charts
  hooks/                     Async list and details loading
  services/service.js        The only layer calling the Fake API
  api/fakeApi.js             Provided asynchronous API
  api/initial-data-sample.js Starter tasks
  api/settings.js            Delay, error rate, and storage key
  styles/main.css            Responsive styling
```

Pages import API operations from `services/service.js`. They do not call `localStorage` directly. The provided `fakeApi.js` implementation is unchanged from the previous assignment.

## Starter data and persistence

On first load, the Fake API creates 24 example study tasks across six subjects. Statistics always come from API data, not from hardcoded totals. New tasks and edits are saved to `localStorage` by the Fake API and persist after page reloads.

The initial data is inserted only if the storage key is absent. Editing `initial-data-sample.js` after opening the application will not reset existing browser data. For testing with fresh seed data, clear the matching key in browser Developer Tools → Application/Storage → Local Storage, then refresh.

## Async behavior

The API normally delays requests by 350–1200 ms and occasionally returns an error. These settings are in `src/api/settings.js` and can be temporarily changed for demonstrations. `useAllTasks` and `useTask` ignore outdated responses in their effect cleanup functions. Mutations capture the target task ID, disable conflicting actions, and use functional state updates.

The Fake API `createItem()` saves only the name and description; the service then calls `updateItem()` to save the extra task fields. If that second call fails, the UI offers a direct link to repair the partially created task.

## GitHub Pages preparation

The project already uses `HashRouter`, so direct nested URLs and page refreshes work on static GitHub Pages. With a project repository, the published URLs follow the pattern `https://USERNAME.github.io/REPOSITORY/#/tasks/1`.

`vite.config.js` uses a relative asset base (`./`) so the project does not depend on the eventual repository name. GitHub Pages deployment will be configured after the new repository is created; this project does not include a deployment workflow yet.

## Notes

The login page is a styled placeholder. It does not authenticate users. All data is stored in the current browser rather than on a remote server.
