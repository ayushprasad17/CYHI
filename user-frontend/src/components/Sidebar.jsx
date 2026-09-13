import React from "react";
import {
  LayoutDashboard, Bell, Calendar, Clock, CheckSquare, Users, Library,
  HelpCircle, LogOut, X, TrendingUp, School,
} from "lucide-react";
import { C, grad } from "../theme";

/* ----------------------------------------------------------------------- */
/*  SIDEBAR                                                                */
/* ----------------------------------------------------------------------- */
const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "notices", label: "Notices", icon: Bell },
  { key: "events", label: "Events", icon: Calendar },
  { key: "timetable", label: "Timetable", icon: Clock },
  { key: "attendance", label: "Attendance", icon: TrendingUp },
  { key: "assignments", label: "Assignments", icon: CheckSquare },
  { key: "faculty", label: "Faculty", icon: Users },
  { key: "resources", label: "Campus Resources", icon: Library },
  { key: "clubs", label: "Clubs & Societies", icon: Users },
  { key: "help", label: "Help & Support", icon: HelpCircle },
];

export function Sidebar({ page, setPage, mobileOpen, setMobileOpen, unreadNotifCount }) {
  const content = (
    <div className="h-full flex flex-col" style={{ background: C.panel, borderRight: `1px solid ${C.border}` }}>
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: grad }}>
          <School size={18} color="white" />
        </div>
        <div>
          <div className="font-semibold text-[15px] leading-tight" style={{ color: C.text }}>IIIT DMJ</div>
          <div className="text-[11px]" style={{ color: C.faint }}>Smart Campus Hub</div>
        </div>
        <button className="ml-auto lg:hidden" onClick={() => setMobileOpen(false)}>
          <X size={18} style={{ color: C.sub }} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active = page === item.key;
          return (
            <button
              key={item.key}
              onClick={() => { setPage(item.key); setMobileOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors relative"
              style={{
                background: active ? "rgba(91,107,245,0.14)" : "transparent",
                color: active ? "#A6B0FF" : C.sub,
              }}
            >
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full" style={{ background: grad }} />}
              <item.icon size={17} />
              <span className="truncate">{item.label}</span>
              {item.key === "notices" && unreadNotifCount > 0 && (
                <span className="ml-auto text-[10px] font-semibold rounded-full px-1.5 py-0.5" style={{ background: C.red, color: "white" }}>
                  {unreadNotifCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t" style={{ borderColor: C.border }}>
        <button
          onClick={() => setPage("logout")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium"
          style={{ color: "#FF8092" }}
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-[240px] shrink-0 h-screen sticky top-0">{content}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[260px]">{content}</div>
        </div>
      )}
    </>
  );
}
