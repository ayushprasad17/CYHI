import React, { useEffect, useState } from "react";
import { C, grad } from "../theme";
import { Card, Badge, SectionTitle, GhostButton } from "../components/ui";
import { NotifIcon } from "../components/Topbar";
import { NOTIF_INIT } from "../data/mockData";
import { apiGet, apiRequest } from "../api";

export function NotificationsPage({ notifications, setNotifications, showToast }) {
  const [filter, setFilter] = useState("All");
  const [localNotifications, setLocalNotifications] = useState(notifications?.length ? notifications : NOTIF_INIT);
  const cats = ["All", "Academic", "Events", "Deadlines", "Administration"];
  useEffect(() => { apiGet("/notifications?student_id=1", null).then((data) => { if (Array.isArray(data) && data.length) { const mapped = data.map(n => ({ ...n, time: n.time || new Date(n.created_at).toLocaleString(), read: n.read ?? Boolean(n.is_read), cat: n.cat || n.notification_type || "General" })); setLocalNotifications(mapped); setNotifications?.(mapped); } }); }, [setNotifications]);
  const filtered = localNotifications.filter((n) => filter === "All" || n.cat === filter);
  const markAllRead = () => { setLocalNotifications(prev => prev.map(n => ({ ...n, read: true }))); setNotifications?.(prev => prev.map(n => ({ ...n, read: true }))); apiRequest("/notifications/mark-all-read?student_id=1", { method: "PUT" }).catch(() => {}); showToast("All notifications marked as read"); };
  const markRead = (id) => { setLocalNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n)); setNotifications?.(prev => prev.map(n => n.id === id ? { ...n, read: true } : n)); apiRequest(`/notifications/${id}/read`, { method: "PUT" }).catch(() => {}); };
  return <div className="p-4 lg:p-6"><SectionTitle title="Notifications" subtitle="Recent alerts across your student account." action={<GhostButton onClick={markAllRead}>Mark all read</GhostButton>} /><div className="flex gap-2 mb-4 overflow-x-auto pb-1">{cats.map(c => <button key={c} onClick={() => setFilter(c)} className="px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap" style={{ background: filter === c ? grad : "#0E1424", color: filter === c ? "white" : C.sub, border: `1px solid ${filter === c ? "transparent" : C.border}` }}>{c}</button>)}</div><Card className="overflow-hidden">{filtered.map((n,i) => <div key={n.id} onClick={() => markRead(n.id)} className="flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-white/[0.02]" style={{ borderBottom: i < filtered.length-1 ? `1px solid ${C.border}` : "none" }}><NotifIcon type={n.type || "info"} /><div className="min-w-0 flex-1"><div className="text-[13px] leading-snug" style={{ color: n.read ? C.sub : C.text }}>{n.title}</div><div className="text-[11.5px] mt-1 flex items-center gap-2" style={{ color: C.faint }}>{n.time} <Badge>{n.cat}</Badge></div></div>{!n.read && <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: C.indigo }} />}</div>)}</Card></div>;
}
