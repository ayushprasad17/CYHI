import React from "react";
import { Menu, Search, Bell, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { C } from "../theme";
import { Avatar } from "./ui";

/* ----------------------------------------------------------------------- */
/*  TOPBAR                                                                 */
/* ----------------------------------------------------------------------- */
export function Topbar({ title, setMobileOpen, page, setPage, notifOpen, setNotifOpen, notifications, search, setSearch }) {
  return (
    <div
      className="sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-6 py-4 backdrop-blur"
      style={{ background: "rgba(8,11,20,0.85)", borderBottom: `1px solid ${C.border}` }}
    >
      <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
        <Menu size={20} style={{ color: C.text }} />
      </button>
      <div className="hidden lg:flex items-center gap-2 text-[13px]" style={{ color: C.faint }}>
        <span style={{ color: C.text }} className="font-semibold text-[15px]">{title}</span>
      </div>

      <div className="flex-1 flex justify-center lg:justify-end">
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.faint }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses, notices, events…"
            className="w-full rounded-lg pl-9 pr-3 py-2 text-[13px] outline-none"
            style={{ background: "#0F1526", border: `1px solid ${C.border}`, color: C.text }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 relative">
        <button onClick={() => setNotifOpen((s) => !s)} className="relative p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
          <Bell size={17} style={{ color: C.text }} />
          {notifications.some((n) => !n.read) && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: C.red }} />
          )}
        </button>
        {notifOpen && <NotifDropdown notifications={notifications} onClose={() => setNotifOpen(false)} onSeeAll={() => { setPage("notifications"); setNotifOpen(false); }} />}
        <button onClick={() => setPage("profile")} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
          <Avatar size={30} />
          <div className="hidden md:block text-left leading-tight">
            <div className="text-[12.5px] font-medium" style={{ color: C.text }}>Aeman Khan</div>
            <div className="text-[10.5px]" style={{ color: C.faint }}>B.Tech CSE · Sem 3</div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  NOTIFICATION ICON + DROPDOWN (shared with NotificationsPage)          */
/* ----------------------------------------------------------------------- */
export function NotifIcon({ type }) {
  const map = {
    error: { icon: AlertCircle, color: C.red },
    warning: { icon: AlertCircle, color: C.amber },
    success: { icon: CheckCircle2, color: C.green },
    info: { icon: Info, color: "#A6B0FF" },
  };
  const m = map[type] || map.info;
  return (
    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${m.color}22` }}>
      <m.icon size={15} style={{ color: m.color }} />
    </div>
  );
}

function NotifDropdown({ notifications, onClose, onSeeAll }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-12 w-80 rounded-2xl z-50 overflow-hidden" style={{ background: C.panel2, border: `1px solid ${C.borderStrong}`, boxShadow: "0 20px 45px rgba(0,0,0,0.55)" }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${C.border}` }}>
          <span className="text-[13.5px] font-semibold" style={{ color: C.text }}>Notifications</span>
          <span className="text-[11.5px]" style={{ color: "#A6B0FF" }}>{notifications.filter((n) => !n.read).length} unread</span>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.slice(0, 5).map((n) => (
            <div key={n.id} className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.03]" style={{ borderBottom: `1px solid ${C.border}` }}>
              <NotifIcon type={n.type} />
              <div className="min-w-0">
                <div className="text-[12.5px] leading-snug" style={{ color: n.read ? C.sub : C.text }}>{n.title}</div>
                <div className="text-[11px] mt-1" style={{ color: C.faint }}>{n.time}</div>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full mt-1.5 ml-auto shrink-0" style={{ background: C.indigo }} />}
            </div>
          ))}
        </div>
        <button onClick={onSeeAll} className="w-full text-center py-2.5 text-[12.5px] font-medium" style={{ color: "#A6B0FF" }}>
          See all notifications
        </button>
      </div>
    </>
  );
}
