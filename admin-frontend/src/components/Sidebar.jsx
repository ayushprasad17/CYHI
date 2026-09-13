import {
  GradCapIcon, DashboardIcon, MegaphoneIcon, CalendarIcon, ClubIcon,
  ResourceIcon, AnalyticsIcon, SettingsIcon, LogoutIcon,
} from './Icons.jsx';

const NAV_ITEMS = [
  { page: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { page: 'announcements', label: 'Announcements', Icon: MegaphoneIcon },
  { page: 'events', label: 'Events', Icon: CalendarIcon },
  { page: 'clubs', label: 'Clubs', Icon: ClubIcon },
  { page: 'resources', label: 'Resources', Icon: ResourceIcon },
  { page: 'students', label: 'Students', Icon: GradCapIcon },
  { page: 'analytics', label: 'Analytics', Icon: AnalyticsIcon },
];

export default function Sidebar({ page, onNavigate, sidebarOpen, onLogout, showToast }) {
  return (
    <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo"><GradCapIcon stroke="#fff" width={19} height={19} /></div>
        <div className="titles">
          <div>Student Info Hub</div>
          <div>Admin Portal</div>
        </div>
      </div>
      <div className="nav-section-label">MAIN MENU</div>
      <ul className="nav-list">
        {NAV_ITEMS.map(({ page: p, label, Icon }) => (
          <li
            key={p}
            className={`nav-item${page === p ? ' active' : ''}`}
            onClick={() => onNavigate(p)}
          >
            <Icon />{label}
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <div className="nav-item" onClick={() => showToast('Settings coming soon')}>
          <SettingsIcon />Settings
        </div>
        <div className="nav-item" onClick={onLogout}>
          <LogoutIcon />Logout
        </div>
      </div>
    </aside>
  );
}
