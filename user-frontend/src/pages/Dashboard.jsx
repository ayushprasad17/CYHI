import React, { useEffect, useState } from "react";
import {
  BookOpen, TrendingUp, CheckSquare, Bell, Library, FileText, Building2, Bus, Users, ClipboardList,
} from "lucide-react";
import { C } from "../theme";
import { Card, Badge, SectionTitle, GhostButton } from "../components/ui";
import { STUDENT, TIMETABLE, EVENTS, ATTENDANCE } from "../data/mockData";
import { apiGet } from "../api";

/* ----------------------------------------------------------------------- */
/*  DASHBOARD PAGE                                                         */
/* ----------------------------------------------------------------------- */
function StatCard({ icon: Icon, label, value, sub, tone }) {
  return (
    <Card className="p-4 flex-1 min-w-[150px]">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${tone}20` }}>
          <Icon size={17} style={{ color: tone }} />
        </div>
      </div>
      <div className="text-[22px] font-semibold" style={{ color: C.text }}>{value}</div>
      <div className="text-[12.5px] mt-0.5" style={{ color: C.sub }}>{label}</div>
      {sub && <div className="text-[11.5px] mt-1.5" style={{ color: C.green }}>{sub}</div>}
    </Card>
  );
}

export function Dashboard({ goTo, notices, assignments }) {
  const [student, setStudent] = useState(STUDENT);
  const [today, setToday] = useState(TIMETABLE.Monday);
  const [events, setEvents] = useState(EVENTS);
  const [attendance, setAttendance] = useState(ATTENDANCE);

  useEffect(() => {
    apiGet("/students", null).then(data => { if (Array.isArray(data) && data.length) setStudent(data[0]); });
    apiGet("/timetable", null).then(data => { if (Array.isArray(data) && data.length) setToday(data.filter(x => x.day === "Monday").map(x => ({ ...x, time: x.time || `${String(x.start_time).slice(0,5)} – ${String(x.end_time).slice(0,5)}` }))); });
    apiGet("/events", null).then(data => { if (Array.isArray(data) && data.length) setEvents(data.map(e => ({ ...e, date: e.date || e.event_date }))); });
    apiGet("/attendance?student_id=1", null).then(data => { if (Array.isArray(data) && data.length) { const total=data.reduce((a,x)=>a+Number(x.total_classes||0),0); const attended=data.reduce((a,x)=>a+Number(x.attended_classes||0),0); setAttendance({...ATTENDANCE, overall: total ? Number((attended/total*100).toFixed(2)) : 0}); }});
  }, []);
  const unreadNotices = notices.filter((n) => n.unread);
  const pendingAssignments = assignments.filter((a) => a.status !== "Submitted");

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-semibold" style={{ color: C.text }}>Good Morning, {student.name.split(" ")[0]} 👋</h1>
        <p className="text-[13.5px] mt-1" style={{ color: C.sub }}>Here's what's happening on campus today.</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <StatCard icon={BookOpen} label="Today's Classes" value={today.filter((c) => c.status !== "Break").length} tone={C.indigo} />
        <StatCard icon={TrendingUp} label="Attendance" value={`${attendance.overall}%`} sub="+3% from last month" tone={C.green} />
        <StatCard icon={CheckSquare} label="Pending Assignments" value={pendingAssignments.length} tone={C.amber} />
        <StatCard icon={Bell} label="New Notices" value={unreadNotices.length} tone={C.red} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle title="Important Announcements" action={<button onClick={() => goTo("notices")} className="text-[12.5px] font-medium" style={{ color: "#A6B0FF" }}>View All</button>} />
          <div className="space-y-2.5">
            {notices.slice(0, 3).map((n) => (
              <button key={n.id} onClick={() => goTo("notices")} className="w-full flex items-center justify-between gap-3 p-3 rounded-xl text-left" style={{ background: "#0B1120", border: `1px solid ${C.border}` }}>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium truncate" style={{ color: C.text }}>{n.title}</div>
                  <div className="text-[11.5px] mt-1" style={{ color: C.faint }}>{n.date}</div>
                </div>
                <Badge tone={n.priority.toLowerCase()}>{n.category}</Badge>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle title="Today's Schedule" action={<button onClick={() => goTo("timetable")} className="text-[12.5px] font-medium" style={{ color: "#A6B0FF" }}>View All</button>} />
          <div className="space-y-3">
            {today.slice(0, 4).map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-[11px] w-[74px] shrink-0" style={{ color: C.faint }}>{c.time.split(" – ")[0]}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-medium truncate" style={{ color: C.text }}>{c.subject}</div>
                  <div className="text-[11px]" style={{ color: C.faint }}>{c.faculty} · {c.room}</div>
                </div>
                <Badge tone={c.status.toLowerCase()}>{c.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle title="Upcoming Events" action={<button onClick={() => goTo("events")} className="text-[12.5px] font-medium" style={{ color: "#A6B0FF" }}>View All</button>} />
          <div className="grid sm:grid-cols-3 gap-3">
            {events.slice(0, 3).map((e) => (
              <div key={e.id} className="rounded-xl p-3.5" style={{ background: "#0B1120", border: `1px solid ${C.border}` }}>
                <div className="text-[13px] font-medium mb-1" style={{ color: C.text }}>{e.title}</div>
                <div className="text-[11px] mb-3" style={{ color: C.faint }}>{e.date.split(" · ")[0]}</div>
                <GhostButton onClick={() => goTo("events")} className="w-full text-center !py-1.5 !text-[12px]">Register</GhostButton>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle title="Quick Access" />
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Library", icon: Library, page: "resources" },
              { label: "Labs", icon: FileText, page: "resources" },
              { label: "Hostel", icon: Building2, page: "resources" },
              { label: "Transport", icon: Bus, page: "resources" },
              { label: "Clubs", icon: Users, page: "resources" },
              { label: "Resources", icon: ClipboardList, page: "resources" },
            ].map((q) => (
              <button key={q.label} onClick={() => goTo(q.page)} className="flex flex-col items-center gap-2 rounded-xl py-3" style={{ background: "#0B1120", border: `1px solid ${C.border}` }}>
                <q.icon size={17} style={{ color: "#A6B0FF" }} />
                <span className="text-[11px]" style={{ color: C.sub }}>{q.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
