// Small inline icon components, mirroring the inline SVGs from the original HTML.
export const GradCapIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
  </svg>
);

export const DashboardIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

export const MegaphoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <path d="M3 11v3a1 1 0 0 0 1 1h2l3.5 4.5V5.5L6 10H4a1 1 0 0 0-1 1Z" />
    <path d="M17 8a5 5 0 0 1 0 8" />
  </svg>
);

export const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const ClubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <path d="M20 7h-3.5l-1-2h-7l-1 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z" />
  </svg>
);

export const ResourceIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 1 4 17.5v-13Z" />
    <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
  </svg>
);

export const AnalyticsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" />
  </svg>
);

export const SettingsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.31.22.65.22 1V10a2 2 0 0 1 0 4h-.09c-.35 0-.69.08-1 .22Z" />
  </svg>
);

export const LogoutIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
  </svg>
);

export const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
  </svg>
);

export const BellIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

export const PlusIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}><path d="M12 5v14M5 12h14" /></svg>
);

export const EyeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" width="16" height="16" {...props}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

export const EditIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" width="16" height="16" {...props}>
    <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export const TrashIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" width="16" height="16" stroke="#EF4444" {...props}>
    <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
  </svg>
);

export const ClockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
  </svg>
);

export const PinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

export const UsersIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
