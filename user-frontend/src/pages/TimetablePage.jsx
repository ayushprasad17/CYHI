import React, { useEffect, useState } from "react";
import { C, grad } from "../theme";
import { Card, Badge, SectionTitle } from "../components/ui";
import { DAYS, TIMETABLE } from "../data/mockData";
import { apiGet } from "../api";

export function TimetablePage() {
  const [day, setDay] = useState("Monday");
  const [allRows, setAllRows] = useState(Object.entries(TIMETABLE).flatMap(([d, rows]) => rows.map(r => ({ ...r, day: d }))));
  useEffect(() => { apiGet("/timetable", null).then(data => { if (Array.isArray(data) && data.length) setAllRows(data.map(item => ({ ...item, time: item.time || `${String(item.start_time).slice(0,5)} – ${String(item.end_time).slice(0,5)}` }))); }); }, []);
  const rows = allRows.filter(c => c.day === day);
  return <div className="p-4 lg:p-6"><SectionTitle title="Class Timetable" subtitle="Your weekly schedule at a glance." /><div className="flex gap-2 mb-5 overflow-x-auto pb-1">{DAYS.map(d => <button key={d} onClick={() => setDay(d)} className="px-4 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap" style={{ background: day === d ? grad : "#0E1424", color: day === d ? "white" : C.sub, border: `1px solid ${day === d ? "transparent" : C.border}` }}>{d}</button>)}</div><Card className="overflow-hidden"><div className="grid grid-cols-[110px_1fr_1fr_90px_100px] px-4 py-3 text-[11.5px] font-semibold" style={{ color: C.faint, borderBottom: `1px solid ${C.border}` }}><div>TIME</div><div>SUBJECT</div><div className="hidden sm:block">FACULTY</div><div>ROOM</div><div>STATUS</div></div>{rows.length === 0 && <div className="p-6 text-center text-[13px]" style={{ color: C.faint }}>No classes scheduled.</div>}{rows.map((c,i)=><div key={c.id || i} className="grid grid-cols-[110px_1fr_1fr_90px_100px] px-4 py-3.5 items-center text-[13px]" style={{ borderBottom: i < rows.length-1 ? `1px solid ${C.border}` : "none" }}><div style={{ color: C.faint }} className="text-[12px]">{c.time}</div><div style={{ color: C.text }} className="font-medium pr-2">{c.subject}</div><div style={{ color: C.sub }} className="hidden sm:block">{c.faculty}</div><div style={{ color: C.sub }}>{c.room}</div><div><Badge tone={(c.status || "Scheduled").toLowerCase()}>{c.status || "Scheduled"}</Badge></div></div>)}</Card></div>;
}
