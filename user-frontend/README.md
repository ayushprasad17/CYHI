# Smart Campus Hub — module structure

Your original `smart-campus-hub.jsx` was one 1,429-line file. It's now split
into focused modules with the exact same UI, data, and behavior — nothing
was rewritten, only reorganized.

```
src/
├── App.jsx                  # Root component: auth gate, routing state, layout shell
├── theme.js                 # Color tokens (C) and the gradient string
├── data/
│   └── mockData.js          # All mock data: STUDENT, TIMETABLE, NOTICES, EVENTS, etc.
├── components/
│   ├── ui.jsx                # Reusable atoms: Card, Badge, buttons, Toast, Avatar…
│   ├── LoginPage.jsx          # Login screen
│   ├── Sidebar.jsx            # Left nav (desktop + mobile drawer)
│   └── Topbar.jsx             # Top bar: search, notification bell + dropdown
└── pages/
    ├── Dashboard.jsx
    ├── NoticesPage.jsx
    ├── EventsPage.jsx
    ├── TimetablePage.jsx
    ├── AttendancePage.jsx
    ├── AssignmentsPage.jsx
    ├── FacultyPage.jsx
    ├── ResourcesPage.jsx
    ├── NotificationsPage.jsx
    ├── ProfilePage.jsx
    └── HelpPage.jsx
```

## Why this split

- **`theme.js`** — one source of truth for colors, imported everywhere
  instead of copy-pasted.
- **`data/mockData.js`** — all the fake/seed data lives in one place, so
  swapping in a real API later means editing one file, not hunting through
  1,400 lines.
- **`components/`** — things used on more than one page or that make up the
  app shell (login, sidebar, topbar, small UI atoms).
- **`pages/`** — one file per sidebar destination. Each page only imports
  what it actually uses, so you can jump straight to `pages/AssignmentsPage.jsx`
  to change how assignments work without scrolling past nine other pages.
- **`App.jsx`** — now just wiring: top-level state (auth, current page,
  notices/assignments/notifications), and the page-key → component map.

## Running it

This is now a complete, runnable Vite + React + Tailwind project.

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production
build in `dist/`.

Included scaffold files (not part of the original single file, added so the
split project actually runs):
- `package.json` — React, `lucide-react`, `recharts`, Vite, Tailwind
- `index.html`, `src/main.jsx` — Vite entry point that mounts `App`
- `src/index.css` — Tailwind directives + the toast fade-in keyframe
- `vite.config.js`, `tailwind.config.js`, `postcss.config.js` — build config

## What didn't change

- No logic was altered — filters, toasts, edit/save flows, registration
  toggles, etc. all behave exactly as before.
- `NotifIcon` (used by both the topbar dropdown and the Notifications page)
  is exported from `components/Topbar.jsx` and imported by
  `pages/NotificationsPage.jsx`, avoiding duplication.
