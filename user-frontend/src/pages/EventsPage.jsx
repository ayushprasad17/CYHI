import React, { useEffect, useState } from "react";
import { Search, Calendar, CheckCircle2 } from "lucide-react";
import { C, grad } from "../theme";
import { Card, Badge, SectionTitle, PrimaryButton, GhostButton } from "../components/ui";
import { EVENTS } from "../data/mockData";
import { apiGet } from "../api";

/* ----------------------------------------------------------------------- */
/*  EVENTS PAGE                                                            */
/* ----------------------------------------------------------------------- */
export function EventsPage({ showToast }) {
  const [query, setQuery] = useState("");
  const [registered, setRegistered] = useState({});
  const [events, setEvents] = useState(EVENTS);
  useEffect(() => { apiGet("/events", null).then((data) => { if (Array.isArray(data) && data.length) setEvents(data.map(e => ({ ...e, date: e.date || e.event_date, venue: e.venue || e.location, desc: e.desc || e.description, tag: e.tag || "Event" }))); }); }, []);

  const filtered = events.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()));

  const toggleRegister = (id, title) => {
    setRegistered((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? `Registered for ${title}` : `Registration cancelled`);
      return next;
    });
  };

  return (
    <div className="p-4 lg:p-6">
      <SectionTitle title="Campus Events" subtitle="Discover and participate in exciting events and activities." />

      <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.faint }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events…"
            className="w-full rounded-lg pl-9 pr-3 py-2.5 text-[13px] outline-none" style={{ background: "#0B1120", border: `1px solid ${C.border}`, color: C.text }} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filtered.map((e) => (
          <Card key={e.id} className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: grad }}>
                <Calendar size={17} color="white" />
              </div>
              <Badge>{e.tag}</Badge>
            </div>
            <div className="text-[14.5px] font-semibold mb-1.5" style={{ color: C.text }}>{e.title}</div>
            <p className="text-[12.5px] leading-relaxed mb-3 flex-1" style={{ color: C.sub }}>{e.desc}</p>
            <div className="text-[11.5px] mb-1" style={{ color: C.faint }}>{e.date}</div>
            <div className="text-[11.5px] mb-4" style={{ color: C.faint }}>{e.venue}</div>
            {registered[e.id] ? (
              <GhostButton onClick={() => toggleRegister(e.id, e.title)} className="w-full text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 size={14} style={{ color: C.green }} /> Registered
              </GhostButton>
            ) : (
              <PrimaryButton onClick={() => toggleRegister(e.id, e.title)} full>Register</PrimaryButton>
            )}
          </Card>
        ))}
      </div>

      <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: `linear-gradient(120deg, rgba(91,107,245,0.18), rgba(139,92,246,0.18))` }}>
        <div>
          <div className="text-[15px] font-semibold mb-1" style={{ color: C.text }}>Be a part of something amazing</div>
          <div className="text-[13px]" style={{ color: C.sub }}>Join clubs, events and make memories!</div>
        </div>
        <GhostButton onClick={() => showToast("Browsing all clubs")}>View All Events</GhostButton>
      </Card>
    </div>
  );
}
