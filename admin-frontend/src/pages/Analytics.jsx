import { useState } from 'react';
import { UsersIcon, AnalyticsIcon, MegaphoneIcon, CalendarIcon, ClubIcon, ResourceIcon } from '../components/Icons.jsx';

const eventBars = [
  { label: 'AI Workshop', height: '22%' },
  { label: 'Hackathon', height: '15%' },
  { label: 'Cultural Fest', height: '100%' },
  { label: 'Placement Sem.', height: '48%' },
  { label: 'Env. Drive', height: '65%' },
];

const topAnnouncements = [
  { label: 'Course Registration', value: 432, width: '100%' },
  { label: 'Scholarship Open', value: 378, width: '87%' },
  { label: 'Exam Schedule', value: 312, width: '72%' },
  { label: 'Hostel Maintenance', value: 187, width: '43%' },
];

const topTopics = [
  { rank: '#1', label: 'Course Registration', value: 284 },
  { rank: '#2', label: 'Scholarships', value: 219 },
  { rank: '#3', label: 'Hostel', value: 187 },
  { rank: '#4', label: 'Placement', value: 163 },
  { rank: '#5', label: 'Events', value: 142 },
];

export default function Analytics() {
  const [range, setRange] = useState('6m');

  return (
    <section className="page active">
      <div className="page-head">
        <div><h1>Analytics</h1><p>Understand how students interact with the information hub</p></div>
        <div className="range-toggle">
          {['1m', '3m', '6m', '1y'].map((r) => (
            <button key={r} className={range === r ? 'active' : ''} onClick={() => setRange(r)}>{r}</button>
          ))}
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><div className="icon icon-indigo"><UsersIcon /></div><div className="value">820</div><div className="label">Total Students</div><div className="delta">98 new this semester</div></div>
        <div className="stat-card"><div className="icon icon-green"><AnalyticsIcon /></div><div className="value">796</div><div className="label">Active Students</div><div className="delta">97% active rate</div></div>
        <div className="stat-card"><div className="icon icon-blue"><MegaphoneIcon /></div><div className="value">28</div><div className="label">Announcements</div><div className="delta">4 this week</div></div>
        <div className="stat-card"><div className="icon icon-purple"><CalendarIcon /></div><div className="value">18</div><div className="label">Total Events</div><div className="delta">6 upcoming</div></div>
        <div className="stat-card"><div className="icon icon-amber"><ClubIcon /></div><div className="value">15</div><div className="label">Clubs</div><div className="delta">580 total members</div></div>
        <div className="stat-card"><div className="icon icon-indigo"><ResourceIcon /></div><div className="value">20</div><div className="label">Resources</div><div className="delta">7 categories</div></div>
      </div>

      <div className="grid-2col" style={{ marginBottom: 18 }}>
        <div className="card chart-card">
          <h3>Student Activity Over Time</h3><p className="sub">Total registered students per month</p>
          <svg viewBox="0 0 560 190" style={{ width: '100%', height: 190 }}>
            <polyline points="10,110 100,100 190,120 280,80 370,70 460,60 550,40" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            <g fill="#6366F1">
              <circle cx="10" cy="110" r="4" /><circle cx="100" cy="100" r="4" /><circle cx="190" cy="120" r="4" />
              <circle cx="280" cy="80" r="4" /><circle cx="370" cy="70" r="4" /><circle cx="460" cy="60" r="4" /><circle cx="550" cy="40" r="4" />
            </g>
            <text x="10" y="185" fontSize="11" fill="#9CA3AF">Apr</text>
            <text x="95" y="185" fontSize="11" fill="#9CA3AF">May</text>
            <text x="182" y="185" fontSize="11" fill="#9CA3AF">Jun</text>
            <text x="272" y="185" fontSize="11" fill="#9CA3AF">Jul</text>
            <text x="362" y="185" fontSize="11" fill="#9CA3AF">Aug</text>
            <text x="452" y="185" fontSize="11" fill="#9CA3AF">Sep</text>
          </svg>
        </div>
        <div className="card chart-card">
          <h3>Event Registrations</h3><p className="sub">Students registered per event</p>
          <div className="bars">
            {eventBars.map((b) => (
              <div className="bar-col" key={b.label}>
                <div className="bar" style={{ height: b.height }}></div>
                <div className="lab">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2col" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div className="card chart-card">
          <h3>Most Viewed Announcements</h3><p className="sub">Top 5 by student views</p>
          <div className="bar-list">
            {topAnnouncements.map((a) => (
              <div className="bar-list-row" key={a.label}>
                <div className="top-row"><span>{a.label}</span><b>{a.value}</b></div>
                <div className="track"><div className="fill" style={{ width: a.width }}></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card chart-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ alignSelf: 'flex-start' }}><h3>Popular Resources</h3><p className="sub">By percentage of usage</p></div>
          <svg viewBox="0 0 120 120" style={{ width: 150, height: 150, marginTop: 6 }}>
            <circle cx="60" cy="60" r="45" fill="none" stroke="#EEF0FE" strokeWidth="18" />
            <circle cx="60" cy="60" r="45" fill="none" stroke="#6366F1" strokeWidth="18" strokeDasharray="130 283" strokeDashoffset="0" transform="rotate(-90 60 60)" />
            <circle cx="60" cy="60" r="45" fill="none" stroke="#3B82F6" strokeWidth="18" strokeDasharray="70 283" strokeDashoffset="-130" transform="rotate(-90 60 60)" />
            <circle cx="60" cy="60" r="45" fill="none" stroke="#F59E0B" strokeWidth="18" strokeDasharray="50 283" strokeDashoffset="-200" transform="rotate(-90 60 60)" />
            <circle cx="60" cy="60" r="45" fill="none" stroke="#10B981" strokeWidth="18" strokeDasharray="33 283" strokeDashoffset="-250" transform="rotate(-90 60 60)" />
          </svg>
        </div>
        <div className="card chart-card">
          <h3>Most Searched Topics</h3><p className="sub">By search frequency</p>
          <div>
            {topTopics.map((t) => (
              <div className="topic-row" key={t.rank}>
                <span><span className="rank">{t.rank}</span>{t.label}</span><b>{t.value}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
