import { useEffect, useRef, useState } from 'react';
import { apiGet, apiRequest } from './api.js';
import Login from './components/Login.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import ToastStack from './components/Toast.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Announcements from './pages/Announcements.jsx';
import Events from './pages/Events.jsx';
import Clubs from './pages/Clubs.jsx';
import Resources from './pages/Resources.jsx';
import Students from './pages/Students.jsx';
import Analytics from './pages/Analytics.jsx';
import AnnouncementModal from './modals/AnnouncementModal.jsx';
import EventModal from './modals/EventModal.jsx';
import ClubModal from './modals/ClubModal.jsx';
import ResourceModal from './modals/ResourceModal.jsx';
import useToasts from './utils/useToasts.js';
import {
  initialAnnouncements, initialEvents, initialClubs, initialResources, initialStudents,
} from './data/initialData.js';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen] = useState(false);

  const { toasts, showToast } = useToasts();

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [events, setEvents] = useState(initialEvents);
  const [clubs, setClubs] = useState(initialClubs);
  const [resources, setResources] = useState(initialResources);
  const [students, setStudents] = useState(initialStudents);

  useEffect(() => {
    let alive = true;
    Promise.all([
      apiGet('/notices', []), apiGet('/events', []), apiGet('/clubs', []),
      apiGet('/resources', []), apiGet('/students', []),
    ]).then(([notices, evs, cls, res, studs]) => {
      if (!alive) return;
      if (notices.length) setAnnouncements(notices.map((n) => ({
        id: n.id, title: n.title, category: n.category || 'General', priority: n.priority || 'Medium',
        audience: n.audience || 'All Students', date: n.notice_date || n.date, status: n.status || 'Published',
      })));
      if (evs.length) setEvents(evs.map((e) => ({
        id: e.id, title: e.title, category: e.category || 'Workshop', status: e.status || 'Upcoming',
        date: e.event_date || e.date, time: e.start_time ? String(e.start_time).slice(0,5) : e.time,
        location: e.location || 'TBA', registered: e.registered || 0, reg: e.reg || 'Open',
      })));
      if (cls.length) setClubs(cls.map((c) => ({ id:c.id, name:c.name, category:c.category, status:c.status, desc:c.description || c.desc || '', coordinator:c.coordinator || '', members:c.members || 0, contact:c.contact || '' })));
      if (res.length) setResources(res.map((r) => ({ id:r.id, name:r.title || r.name, category:r.category || r.resource_type || 'Academic', status:r.status || 'Active', desc:r.description || r.desc || '', url:r.resource_url || r.url || '#', updated:(r.created_at || '').slice(0,10) || new Date().toISOString().slice(0,10) })));
      if (studs.length) setStudents(studs.map((s) => ({ id:s.id, name:s.name, email:s.email, roll:s.student_id, dept:s.program || '', sem:s.semester || '', status:s.status || 'Active', joined:(s.created_at || '').slice(0,10) })));
    });
    return () => { alive = false; };
  }, []);

  const uidRef = useRef(1000);
  const nextId = () => ++uidRef.current;

  // Which record (if any) is being edited per entity — id or null for "create".
  const [annModal, setAnnModal] = useState({ open: false, id: null });
  const [evModal, setEvModal] = useState({ open: false, id: null });
  const [clubModal, setClubModal] = useState({ open: false, id: null });
  const [resModal, setResModal] = useState({ open: false, id: null });

  const [confirm, setConfirm] = useState({ open: false, action: null });

  function requestDelete(action) {
    setConfirm({ open: true, action });
  }
  function cancelDelete() {
    setConfirm({ open: false, action: null });
  }
  function runDelete() {
    confirm.action?.();
    setConfirm({ open: false, action: null });
  }

  // ---------- API-backed CRUD ----------
  async function saveAnnouncement(data) {
    try {
      const payload = { title:data.title, description:data.description || '', category:data.category, posted_by:'Admin', notice_date:data.date, priority:data.priority, audience:data.audience, status:data.status };
      const row = annModal.id ? await apiRequest(`/notices/${annModal.id}`, { method:'PUT', body:JSON.stringify(payload) }) : await apiRequest('/notices', { method:'POST', body:JSON.stringify(payload) });
      const item = { id:row.id, title:row.title, category:row.category || 'General', priority:row.priority || data.priority, audience:row.audience || data.audience, date:row.notice_date || data.date, status:row.status || data.status };
      setAnnouncements((p) => annModal.id ? p.map((a)=>a.id===annModal.id?item:a) : [item,...p]); showToast(annModal.id?'Announcement updated':'Announcement created'); setAnnModal({open:false,id:null});
    } catch(e) { showToast(`Save failed: ${e.message}`); }
  }
  async function deleteAnnouncement(id) { try { await apiRequest(`/notices/${id}`,{method:'DELETE'}); setAnnouncements(p=>p.filter(a=>a.id!==id)); showToast('Announcement deleted'); } catch(e){showToast(`Delete failed: ${e.message}`);} }

  async function saveEvent(data) {
    try { const payload={ title:data.title, description:data.description||'', category:data.category, event_date:data.date ? String(data.date).slice(0,10) : null, start_time:data.time, location:data.location, registered:data.registered, status:data.status, reg:data.reg }; const row=evModal.id?await apiRequest(`/events/${evModal.id}`,{method:'PUT',body:JSON.stringify(payload)}):await apiRequest('/events',{method:'POST',body:JSON.stringify(payload)}); const item={id:row.id,title:row.title,category:row.category||data.category,status:row.status||data.status,date:row.event_date||data.date,time:row.start_time?String(row.start_time).slice(0,5):data.time,location:row.location||data.location,registered:row.registered||0,reg:row.reg||data.reg}; setEvents(p=>evModal.id?p.map(e=>e.id===evModal.id?item:e):[item,...p]); showToast(evModal.id?'Event updated':'Event created'); setEvModal({open:false,id:null}); } catch(e){showToast(`Save failed: ${e.message}`);} }
  async function deleteEvent(id) { try { await apiRequest(`/events/${id}`,{method:'DELETE'}); setEvents(p=>p.filter(e=>e.id!==id)); showToast('Event deleted'); } catch(e){showToast(`Delete failed: ${e.message}`);} }

  async function saveClub(data) { try { const row=clubModal.id?await apiRequest(`/clubs/${clubModal.id}`,{method:'PUT',body:JSON.stringify({name:data.name,category:data.category,status:data.status,description:data.desc,coordinator:data.coordinator,members:data.members,contact:data.contact})}):await apiRequest('/clubs',{method:'POST',body:JSON.stringify({name:data.name,category:data.category,status:data.status,description:data.desc,coordinator:data.coordinator,members:data.members,contact:data.contact})}); const item={id:row.id,name:row.name,category:row.category,status:row.status,desc:row.description||'',coordinator:row.coordinator||'',members:row.members||0,contact:row.contact||''}; setClubs(p=>clubModal.id?p.map(c=>c.id===clubModal.id?item:c):[item,...p]); showToast(clubModal.id?'Club updated':'Club added'); setClubModal({open:false,id:null}); } catch(e){showToast(`Save failed: ${e.message}`);} }
  async function deleteClub(id) { try { await apiRequest(`/clubs/${id}`,{method:'DELETE'}); setClubs(p=>p.filter(c=>c.id!==id)); showToast('Club deleted'); } catch(e){showToast(`Delete failed: ${e.message}`);} }

  async function saveResource(data) { try { const row=resModal.id?await apiRequest(`/resources/${resModal.id}`,{method:'PUT',body:JSON.stringify({title:data.name,description:data.desc,category:data.category,status:data.status,resource_url:data.url})}):await apiRequest('/resources',{method:'POST',body:JSON.stringify({title:data.name,description:data.desc,category:data.category,status:data.status,resource_url:data.url,resource_type:data.category,uploaded_by:'Admin'})}); const item={id:row.id,name:row.title||data.name,category:row.category||data.category,status:row.status||data.status,desc:row.description||'',url:row.resource_url||data.url||'#',updated:(row.created_at||data.updated||'').slice(0,10)}; setResources(p=>resModal.id?p.map(r=>r.id===resModal.id?item:r):[item,...p]); showToast(resModal.id?'Resource updated':'Resource added'); setResModal({open:false,id:null}); } catch(e){showToast(`Save failed: ${e.message}`);} }
  async function deleteResource(id) { try { await apiRequest(`/resources/${id}`,{method:'DELETE'}); setResources(p=>p.filter(r=>r.id!==id)); showToast('Resource deleted'); } catch(e){showToast(`Delete failed: ${e.message}`);} }

  async function deleteStudent(id) { try { await apiRequest(`/students/${id}`,{method:'DELETE'}); setStudents(p=>p.filter(s=>s.id!==id)); showToast('Student removed'); } catch(e){showToast(`Delete failed: ${e.message}`);} }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} showToast={showToast} />;
  }

  const editingAnnouncement = annModal.id ? announcements.find((a) => a.id === annModal.id) : null;
  const editingEvent = evModal.id ? events.find((e) => e.id === evModal.id) : null;
  const editingClub = clubModal.id ? clubs.find((c) => c.id === clubModal.id) : null;
  const editingResource = resModal.id ? resources.find((r) => r.id === resModal.id) : null;

  return (
    <div id="app" className="active">
      <Sidebar
        page={page}
        onNavigate={setPage}
        sidebarOpen={sidebarOpen}
        onLogout={() => setLoggedIn(false)}
        showToast={showToast}
      />

      <div className="main">
        <Topbar page={page} showToast={showToast} />

        <div className="content">
          {page === 'dashboard' && (
            <Dashboard
              announcements={announcements}
              events={events}
              clubs={clubs}
              resources={resources}
              students={students}
              onNavigate={setPage}
              onOpenAnnouncement={(id) => setAnnModal({ open: true, id: id || null })}
              onOpenEvent={(id) => setEvModal({ open: true, id: id || null })}
              onOpenResource={(id) => setResModal({ open: true, id: id || null })}
              onOpenClub={(id) => setClubModal({ open: true, id: id || null })}
            />
          )}
          {page === 'announcements' && (
            <Announcements
              announcements={announcements}
              onDelete={deleteAnnouncement}
              onOpenModal={(id) => setAnnModal({ open: true, id: id || null })}
              showToast={showToast}
              onConfirmDelete={requestDelete}
            />
          )}
          {page === 'events' && (
            <Events
              events={events}
              onDelete={deleteEvent}
              onOpenModal={(id) => setEvModal({ open: true, id: id || null })}
              showToast={showToast}
              onConfirmDelete={requestDelete}
            />
          )}
          {page === 'clubs' && (
            <Clubs
              clubs={clubs}
              onDelete={deleteClub}
              onOpenModal={(id) => setClubModal({ open: true, id: id || null })}
              showToast={showToast}
              onConfirmDelete={requestDelete}
            />
          )}
          {page === 'resources' && (
            <Resources
              resources={resources}
              onDelete={deleteResource}
              onOpenModal={(id) => setResModal({ open: true, id: id || null })}
              onConfirmDelete={requestDelete}
            />
          )}
          {page === 'students' && (
            <Students
              students={students}
              onDelete={deleteStudent}
              showToast={showToast}
              onConfirmDelete={requestDelete}
            />
          )}
          {page === 'analytics' && <Analytics />}
        </div>
      </div>

      <AnnouncementModal
        open={annModal.open}
        editing={editingAnnouncement}
        onClose={() => setAnnModal({ open: false, id: null })}
        onSave={saveAnnouncement}
        showToast={showToast}
      />
      <EventModal
        open={evModal.open}
        editing={editingEvent}
        onClose={() => setEvModal({ open: false, id: null })}
        onSave={saveEvent}
        showToast={showToast}
      />
      <ClubModal
        open={clubModal.open}
        editing={editingClub}
        onClose={() => setClubModal({ open: false, id: null })}
        onSave={saveClub}
        showToast={showToast}
      />
      <ResourceModal
        open={resModal.open}
        editing={editingResource}
        onClose={() => setResModal({ open: false, id: null })}
        onSave={saveResource}
        showToast={showToast}
      />
      <ConfirmModal open={confirm.open} onCancel={cancelDelete} onConfirm={runDelete} />

      <ToastStack toasts={toasts} />
    </div>
  );
}
