import { SearchIcon, BellIcon } from './Icons.jsx';
import { pageTitles } from '../data/initialData.js';

export default function Topbar({ page, showToast }) {
  return (
    <div className="topbar">
      <h2>{pageTitles[page]}</h2>
      <div className="topbar-right">
        <div className="search-box">
          <SearchIcon />
          <input type="text" placeholder="Search anything..." />
        </div>
        <button className="icon-btn" onClick={() => showToast('4 unread notifications')}>
          <BellIcon />
          <span className="dot"></span>
        </button>
        <div className="admin-chip" onClick={() => showToast('Profile menu (demo)')}>
          <div className="avatar">AD</div>
          <div className="who">
            <div>Admin</div>
            <div>admin@university.edu</div>
          </div>
        </div>
      </div>
    </div>
  );
}
