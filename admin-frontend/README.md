# Student Info Hub — React version

A React + Vite conversion of the original single-file `student_info_hub.html`
admin portal. All the pages (Dashboard, Announcements, Events, Clubs,
Resources, Students, Analytics), modals, filters, search, pagination, toasts,
and the login gate are preserved and fully interactive — add/edit/delete work
against in-memory React state, same as the original's in-memory JS arrays.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

Login is still demo-mode: any email/password signs you in (the original's
`fetch('http://127.0.0.1:5000/...')` calls were a stub pointing at a backend
that doesn't exist in this environment, so they've been replaced with local
state — see "Notes" below).

## Project structure

```
src/
  App.jsx              — top-level state (all entities, modals, toasts, page/nav)
  index.css             — the original stylesheet, unchanged
  data/initialData.js   — the original seed/demo data arrays
  utils/
    helpers.js           — fmtDate, initials, pillClass, uniq
    useToasts.js          — toast queue hook
  components/
    Icons.jsx             — inline SVG icon components
    Login.jsx
    Sidebar.jsx
    Topbar.jsx
    Toast.jsx
    ConfirmModal.jsx       — shared delete-confirmation dialog
  pages/
    Dashboard.jsx
    Announcements.jsx
    Events.jsx             — cards/table view toggle
    Clubs.jsx
    Resources.jsx
    Students.jsx            — paginated
    Analytics.jsx            — static demo charts (SVG, same as original)
  modals/
    AnnouncementModal.jsx
    EventModal.jsx
    ClubModal.jsx
    ResourceModal.jsx
```

## Notes on the conversion

- All DOM-manipulation (`document.getElementById(...).innerHTML = ...`) was
  replaced with React state + JSX rendering. Filters/search are local
  `useState` in each page component, same scope as the original's per-field
  globals.
- The original's stray `API_URL` / `fetch('http://127.0.0.1:5000/api/admin')`
  calls (login, load/create announcements, load/create events) never actually
  ran against anything in the shipped HTML — the UI itself always used the
  in-memory `announcements`/`events` arrays regardless of what those fetches
  returned. This version keeps that same in-memory behavior and drops the
  dead fetch calls. If you do have a real backend at that URL, it's
  straightforward to swap the `useState` initial values for a `useEffect`
  fetch, and change `save*`/`delete*` in `App.jsx` to `await` API calls.
- IDs for new records increment from `1000`, matching the original's `uid`
  counter.
- Mobile sidebar toggle CSS (`.sidebar.open`) is preserved, but the original
  markup never included a hamburger button to trigger it, so neither does
  this version — sidebar is always visible on desktop widths.
