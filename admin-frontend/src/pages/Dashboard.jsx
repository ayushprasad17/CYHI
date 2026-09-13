import {
  UsersIcon, MegaphoneIcon, CalendarIcon, ClubIcon, ResourceIcon,
} from '../components/Icons.jsx';
import { pillClass } from '../utils/helpers.js';

export default function Dashboard({
  announcements, events, clubs, resources, students,
  onNavigate, onOpenAnnouncement, onOpenEvent, onOpenResource, onOpenClub,
}) {
  const totalStudents = students.length + (820 - 10); // keep demo total large, matches original
  const upcomingEvents = events.filter((e) => e.status === 'Upcoming').length;

  const recent = [
    { who: 'AD', t1: <>New announcement published <span>"{announcements[0]?.title || ''}"</span></>, t2: 'by Admin · just now', status: 'Published' },
    { who: 'AD', t1: <>Event created <span>"AI Workshop"</span></>, t2: 'by Admin · 1 hr ago', status: 'Upcoming' },
    { who: 'AD', t1: <>Club updated <span>"Coding Club"</span></>, t2: 'by Admin · 2 hr ago', status: 'Active' },
    { who: 'SY', t1: 'New student registered Priya Mehta (MBA)', t2: 'by System · 3 hr ago', status: 'Active' },
    { who: 'AD', t1: <>Resource updated <span>"Library Portal"</span></>, t2: 'by Admin · 5 hr ago', status: 'Active' },
  ];

  return (
    <section className="page active">
      <div className="page-head">
        <div><h1>Dashboard</h1><p>Overview of your campus information hub</p></div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="icon icon-indigo"><UsersIcon /></div>
          <div className="value">{totalStudents}</div>
          <div className="label">Total Students</div>
          <div className="delta">↑ +12 this month</div>
        </div>
        <div className="stat-card">
          <div className="icon icon-blue"><MegaphoneIcon /></div>
          <div className="value">{announcements.length}</div>
          <div className="label">Announcements</div>
          <div className="delta">↑ +3 this week</div>
        </div>
        <div className="stat-card">
          <div className="icon icon-amber"><CalendarIcon /></div>
          <div className="value">{upcomingEvents}</div>
          <div className="label">Upcoming Events</div>
          <div className="delta">↑ +2 new</div>
        </div>
        <div className="stat-card">
          <div className="icon icon-green"><ClubIcon /></div>
          <div className="value">{clubs.length}</div>
          <div className="label">Clubs</div>
          <div className="delta" style={{ color: 'var(--text-soft)' }}>No change</div>
        </div>
        <div className="stat-card">
          <div className="icon icon-purple"><ResourceIcon /></div>
          <div className="value">{resources.length}</div>
          <div className="label">Resources</div>
          <div className="delta">↑ +1 this week</div>
        </div>
      </div>

      <div className="grid-2col">
        <div className="card">
          <div className="card-head">
            <h3>Recent Activity</h3>
            <a href="#" className="link-btn" onClick={(e) => { e.preventDefault(); onNavigate('announcements'); }}>View all ↗</a>
          </div>
          <div className="card-body">
            {recent.map((r, i) => (
              <div className="activity-row" key={i}>
                <div className="badge-round">{r.who}</div>
                <div className="txt">
                  <div className="t1">{r.t1}</div>
                  <div className="t2">{r.t2}</div>
                </div>
                <span className={`pill ${pillClass(r.status)}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-head"><h3>Quick Actions</h3></div>
            <div className="quick-grid">
              <div className="quick-item" onClick={() => onOpenAnnouncement()}>
                <MegaphoneIcon /><div>Create Announcement</div>
              </div>
              <div className="quick-item" onClick={() => onOpenEvent()}>
                <CalendarIcon /><div>Create Event</div>
              </div>
              <div className="quick-item" onClick={() => onOpenResource()}>
                <ResourceIcon /><div>Add Resource</div>
              </div>
              <div className="quick-item" onClick={() => onOpenClub()}>
                <ClubIcon /><div>Add Club</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-head"><h3>System Status</h3></div>
            <div className="status-row"><div className="lab"><span className="status-dot" style={{ background: 'var(--success)' }}></span>Portal Uptime</div><b>99.9%</b></div>
            <div className="status-row"><div className="lab"><span className="status-dot" style={{ background: 'var(--info)' }}></span>Active Sessions</div><b>142</b></div>
            <div className="status-row"><div className="lab"><span className="status-dot" style={{ background: 'var(--warning)' }}></span>Pending Reviews</div><b>4</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}
