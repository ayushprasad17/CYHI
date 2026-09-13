import React, { useState, useRef, useEffect } from "react";
import { C } from "./theme";
import { Toast } from "./components/ui";
import { LoginPage } from "./components/LoginPage";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

import { Dashboard } from "./pages/Dashboard";
import { NoticesPage } from "./pages/NoticesPage";
import { EventsPage } from "./pages/EventsPage";
import { TimetablePage } from "./pages/TimetablePage";
import { AttendancePage } from "./pages/AttendancePage";
import { AssignmentsPage } from "./pages/AssignmentsPage";
import { FacultyPage } from "./pages/FacultyPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ClubsPage } from "./pages/ClubsPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { HelpPage } from "./pages/HelpPage";

import { NOTICES, ASSIGNMENTS_INIT, NOTIF_INIT } from "./data/mockData";

/* ----------------------------------------------------------------------- */
/*  APP ROOT                                                               */
/* ----------------------------------------------------------------------- */
const TITLES = {
  dashboard: "Dashboard", notices: "Notice Center", events: "Campus Events", timetable: "Class Timetable",
  attendance: "Attendance Overview", assignments: "Assignments", faculty: "Faculty Directory",
  resources: "Campus Resources",clubs: "Clubs & Societies", notifications: "Notifications", profile: "Student Profile", help: "Help & Support",
};

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const [notices, setNotices] = useState(NOTICES);
  const [assignments, setAssignments] = useState(ASSIGNMENTS_INIT);
  const [notifications, setNotifications] = useState(NOTIF_INIT);

  const toastTimer = useRef(null);
  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  };

  useEffect(() => {
    if (page === "logout") {
      setAuthed(false);
      setPage("dashboard");
    }
  }, [page]);

  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const pages = {
    dashboard: <Dashboard goTo={setPage} notices={notices} assignments={assignments} />,
    notices: <NoticesPage notices={notices} setNotices={setNotices} showToast={showToast} />,
    events: <EventsPage showToast={showToast} />,
    timetable: <TimetablePage />,
    attendance: <AttendancePage />,
    assignments: <AssignmentsPage assignments={assignments} setAssignments={setAssignments} showToast={showToast} />,
    faculty: <FacultyPage />,
    resources: <ResourcesPage />,
    clubs: <ClubsPage />,
    notifications: <NotificationsPage notifications={notifications} setNotifications={setNotifications} showToast={showToast} />,
    profile: <ProfilePage showToast={showToast} />,
    help: <HelpPage showToast={showToast} />,
  };

  return (
    <div className="min-h-screen w-full flex" style={{ background: C.bg, fontFamily: "Inter, ui-sans-serif, system-ui" }}>
      <Sidebar
        page={page}
        setPage={setPage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        unreadNotifCount={unreadNotifCount}
      />
      <div className="flex-1 min-w-0">
        <Topbar
          title={TITLES[page] || "Dashboard"}
          setMobileOpen={setMobileOpen}
          page={page}
          setPage={setPage}
          notifOpen={notifOpen}
          setNotifOpen={setNotifOpen}
          notifications={notifications}
          search={search}
          setSearch={setSearch}
        />
        {pages[page] || pages.dashboard}
      </div>
      <Toast message={toast} />
    </div>
  );
}
