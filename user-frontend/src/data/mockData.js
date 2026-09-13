import {
  Library, FileText, Building2, Bus, Dumbbell, Users,
} from "lucide-react";

/* ----------------------------------------------------------------------- */
/*  MOCK DATA                                                              */
/* ----------------------------------------------------------------------- */
export const STUDENT = {
  name: "Aeman Khan",
  program: "B.Tech, Computer Science & Engineering",
  semester: "3rd Semester",
  batch: "2024 – 2028",
  studentId: "IIITDMJ2024017",
  email: "aeman.khan@iiitdmj.ac.in",
  phone: "+91 98765 43210",
  address: "Jhansi, Uttar Pradesh",
  status: "Active",
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const TIMETABLE = {
  Monday: [
    { time: "09:00 – 10:00", subject: "Data Structures", faculty: "Dr. Sharma", room: "C-203", status: "Ongoing" },
    { time: "10:15 – 11:15", subject: "Web Development", faculty: "Prof. Mehta", room: "Lab-2", status: "Upcoming" },
    { time: "11:30 – 12:30", subject: "Discrete Mathematics", faculty: "Dr. Khan", room: "B-101", status: "Upcoming" },
    { time: "12:30 – 01:30", subject: "Lunch Break", faculty: "–", room: "–", status: "Break" },
    { time: "02:00 – 03:00", subject: "Operating Systems", faculty: "Prof. Singh", room: "C-205", status: "Upcoming" },
    { time: "03:15 – 04:15", subject: "Computer Networks", faculty: "Dr. Rao", room: "B-302", status: "Upcoming" },
  ],
  Tuesday: [
    { time: "09:00 – 10:00", subject: "Operating Systems", faculty: "Prof. Singh", room: "C-205", status: "Upcoming" },
    { time: "10:15 – 11:15", subject: "Data Structures Lab", faculty: "Dr. Sharma", room: "Lab-1", status: "Upcoming" },
    { time: "11:30 – 12:30", subject: "Computer Networks", faculty: "Dr. Rao", room: "B-302", status: "Upcoming" },
    { time: "12:30 – 01:30", subject: "Lunch Break", faculty: "–", room: "–", status: "Break" },
    { time: "02:00 – 03:00", subject: "Discrete Mathematics", faculty: "Dr. Khan", room: "B-101", status: "Upcoming" },
  ],
  Wednesday: [
    { time: "09:00 – 10:00", subject: "Web Development", faculty: "Prof. Mehta", room: "Lab-2", status: "Upcoming" },
    { time: "10:15 – 11:15", subject: "Data Structures", faculty: "Dr. Sharma", room: "C-203", status: "Upcoming" },
    { time: "11:30 – 12:30", subject: "Discrete Mathematics", faculty: "Dr. Khan", room: "B-101", status: "Upcoming" },
    { time: "12:30 – 01:30", subject: "Lunch Break", faculty: "–", room: "–", status: "Break" },
    { time: "02:00 – 03:00", subject: "Computer Networks Lab", faculty: "Dr. Rao", room: "Lab-3", status: "Upcoming" },
  ],
  Thursday: [
    { time: "09:00 – 10:00", subject: "Operating Systems", faculty: "Prof. Singh", room: "C-205", status: "Upcoming" },
    { time: "10:15 – 11:15", subject: "Web Development", faculty: "Prof. Mehta", room: "Lab-2", status: "Upcoming" },
    { time: "11:30 – 12:30", subject: "Data Structures", faculty: "Dr. Sharma", room: "C-203", status: "Upcoming" },
    { time: "12:30 – 01:30", subject: "Lunch Break", faculty: "–", room: "–", status: "Break" },
    { time: "02:00 – 03:00", subject: "Discrete Mathematics", faculty: "Dr. Khan", room: "B-101", status: "Upcoming" },
  ],
  Friday: [
    { time: "09:00 – 10:00", subject: "Computer Networks", faculty: "Dr. Rao", room: "B-302", status: "Upcoming" },
    { time: "10:15 – 11:15", subject: "Operating Systems Lab", faculty: "Prof. Singh", room: "Lab-1", status: "Upcoming" },
    { time: "11:30 – 12:30", subject: "Web Development", faculty: "Prof. Mehta", room: "Lab-2", status: "Upcoming" },
    { time: "12:30 – 01:30", subject: "Lunch Break", faculty: "–", room: "–", status: "Break" },
    { time: "02:00 – 03:00", subject: "Discrete Mathematics", faculty: "Dr. Khan", room: "B-101", status: "Upcoming" },
  ],
  Saturday: [
    { time: "10:00 – 12:00", subject: "Open Elective Workshop", faculty: "Dr. Verma", room: "Seminar Hall", status: "Upcoming" },
  ],
};

export const NOTICES = [
  { id: 1, title: "Mid-semester Examination Schedule Released", category: "Academic", priority: "High", date: "Oct 12, 2024 · 10:00 AM", unread: true,
    body: "The mid-semester examination schedule for all branches has been released. Students are advised to check their exam portal for detailed date sheets and download admit cards before the deadline. Any discrepancies should be reported to the examination cell within 48 hours." },
  { id: 2, title: "Hackathon 2024 Registration Open", category: "Events", priority: "Medium", date: "Oct 12, 2024 · 09:00 AM", unread: true,
    body: "Registrations are now open for the annual 24-hour hackathon. Teams of up to four members can register through the student portal. Prizes worth ₹1,00,000 are up for grabs across three tracks: AI/ML, Web3, and Sustainability." },
  { id: 3, title: "Hostel Mess Menu Updated", category: "General", priority: "Low", date: "Oct 9, 2024 · 04:20 PM", unread: false,
    body: "The mess committee has revised the weekly menu based on student feedback collected last month. The new menu introduces more regional dishes and an expanded salad counter. Check the hostel notice board for the full weekly rotation." },
  { id: 4, title: "Placement Drive – Leading Tech Companies", category: "Placement", priority: "High", date: "Oct 8, 2024 · 11:00 AM", unread: false,
    body: "An on-campus placement drive for pre-final year students will be conducted next week featuring four leading technology companies. Eligible students must update their resumes on the placement portal before the registration deadline." },
  { id: 5, title: "Library Extended Hours During Exams", category: "Academic", priority: "Medium", date: "Oct 6, 2024 · 02:15 PM", unread: false,
    body: "The central library will remain open until 2:00 AM on weekdays during the examination period to support student preparation. Additional seating has been arranged in the reading hall on the second floor." },
  { id: 6, title: "Grievance Redressal Cell – New Members", category: "Administration", priority: "Low", date: "Oct 3, 2024 · 09:40 AM", unread: false,
    body: "Three new student representatives have joined the Grievance Redressal Cell for this academic year. Students can reach out to any committee member or submit concerns anonymously via the student handbook portal." },
];

export const CATEGORIES = ["All", "Academic", "Examination", "Placement", "Events", "Administration", "General"];

export const EVENTS = [
  { id: 1, title: "Tech Fest 2024", date: "Oct 18, 2024 · 10:00 AM", venue: "Auditorium", tag: "Featured",
    desc: "A two-day celebration of technology with hands-on workshops, robotics demos, and a 24-hour build sprint open to all branches." },
  { id: 2, title: "Guest Lecture – AI & Future", date: "Oct 21, 2024 · 11:00 AM", venue: "Auditorium", tag: "Talk",
    desc: "An industry expert walks through the near-term future of applied AI, followed by an open Q&A session for students." },
  { id: 3, title: "Cultural Carnival", date: "Oct 26, 2024 · 06:00 PM", venue: "Open Air Theatre", tag: "Cultural",
    desc: "Music, dance, and drama performances by student societies, capped off with a live band performance under the stars." },
  { id: 4, title: "Inter-Branch Coding Sprint", date: "Nov 2, 2024 · 09:00 AM", venue: "Lab Complex", tag: "Competition",
    desc: "A three-hour competitive programming sprint with problems spanning arrays, graphs, and dynamic programming." },
];

export const ASSIGNMENTS_INIT = [
  { id: 1, subject: "Data Structures", title: "Arrays and Linked Lists", due: "Oct 16, 2024", priority: "High", status: "Not Submitted" },
  { id: 2, subject: "Web Development", title: "Portfolio Website", due: "Oct 18, 2024", priority: "Medium", status: "Submitted" },
  { id: 3, subject: "Operating Systems", title: "Process Scheduling Report", due: "Oct 20, 2024", priority: "Low", status: "Not Submitted" },
  { id: 4, subject: "Computer Networks", title: "OSI Layer Case Study", due: "Oct 22, 2024", priority: "Medium", status: "Not Submitted" },
  { id: 5, subject: "Discrete Mathematics", title: "Graph Theory Problem Set", due: "Oct 10, 2024", priority: "High", status: "Overdue" },
  { id: 6, subject: "Web Development", title: "API Integration Task", due: "Oct 5, 2024", priority: "High", status: "Submitted" },
];

export const FACULTY = [
  { id: 1, name: "Dr. R. Sharma", role: "Professor & Head", dept: "Computer Science", email: "r.sharma@iiitdmj.ac.in", phone: "+91 731 233 0001", office: "C-Block, Room 214" },
  { id: 2, name: "Prof. A. Mehta", role: "Associate Professor", dept: "Information Technology", email: "a.mehta@iiitdmj.ac.in", phone: "+91 731 233 0002", office: "B-Block, Room 108" },
  { id: 3, name: "Dr. S. Khan", role: "Assistant Professor", dept: "Mathematics", email: "s.khan@iiitdmj.ac.in", phone: "+91 731 233 0003", office: "B-Block, Room 212" },
  { id: 4, name: "Prof. P. Gupta", role: "Assistant Professor", dept: "Electronics & Comm.", email: "p.gupta@iiitdmj.ac.in", phone: "+91 731 233 0004", office: "A-Block, Room 305" },
  { id: 5, name: "Dr. N. Verma", role: "Professor", dept: "Computer Science", email: "n.verma@iiitdmj.ac.in", phone: "+91 731 233 0005", office: "C-Block, Room 301" },
  { id: 6, name: "Prof. R. Singh", role: "Associate Professor", dept: "Mechanical Engg.", email: "r.singh@iiitdmj.ac.in", phone: "+91 731 233 0006", office: "D-Block, Room 110" },
];
export const DEPARTMENTS = ["All Departments", "Computer Science", "Information Technology", "Mathematics", "Electronics & Comm.", "Mechanical Engg."];

export const RESOURCES = [
  { id: 1, name: "Library", icon: Library, blurb: "Books, e-resources, study space", detail: "Open 8 AM – 2 AM during exams. Over 60,000 volumes, 12 digital research databases, and silent study pods on the third floor." },
  { id: 2, name: "Laboratories", icon: FileText, blurb: "Computer, chemistry, core labs", detail: "18 laboratories across departments, each equipped with current-generation hardware and supervised lab assistants during working hours." },
  { id: 3, name: "Hostels", icon: Building2, blurb: "Boys & girls hostels", detail: "Six hostel blocks with Wi-Fi, laundry, and mess facilities. Room allotment and maintenance requests are handled through the hostel office." },
  { id: 4, name: "Transport", icon: Bus, blurb: "Campus buses & connectivity", detail: "Shuttle buses run every 30 minutes between campus and the city center from 7 AM to 9 PM. Route maps are posted at every stop." },
  { id: 5, name: "Sports Facilities", icon: Dumbbell, blurb: "Indoor & outdoor sports", detail: "Cricket ground, basketball and badminton courts, a gymnasium, and a swimming pool, all bookable through the sports office." },
  { id: 6, name: "Clubs & Societies", icon: Users, blurb: "Cultural, tech & sports clubs", detail: "26 active student-run clubs spanning robotics, photography, drama, and debate. New member drives open at the start of each semester." },
];

export const NOTIF_INIT = [
  { id: 1, type: "error", title: "New Notice: Mid-semester examination schedule released", time: "5m ago", read: false, cat: "Academic" },
  { id: 2, type: "info", title: "Event: Tech Fest 2024 coming soon", time: "1h ago", read: false, cat: "Events" },
  { id: 3, type: "warning", title: "Assignment Deadline: DSA Assignment 3", time: "2h ago", read: false, cat: "Deadlines" },
  { id: 4, type: "success", title: "Timetable Change: OS moved to Lab-6", time: "1d ago", read: true, cat: "Academic" },
  { id: 5, type: "error", title: "Campus Alert: Hostel mess menu updated", time: "2d ago", read: true, cat: "Administration" },
];

export const ATTENDANCE = {
  overall: 87,
  present: 412,
  absent: 42,
  late: 12,
  subjects: [
    { name: "Data Structures", pct: 92 },
    { name: "Web Development", pct: 88 },
    { name: "Discrete Mathematics", pct: 79 },
    { name: "Operating Systems", pct: 84 },
    { name: "Computer Networks", pct: 90 },
  ],
  trend: [78, 81, 83, 80, 85, 87, 87],
};

export const FAQS = [
  { q: "How do I reset my student portal password?", a: "Go to the login page and select 'Forgot password'. A reset link will be sent to your registered college email within a few minutes." },
  { q: "Where can I check my exam admit card?", a: "Admit cards are available under Notices → Examination once released, or directly from the Examination Cell section of the student portal." },
  { q: "How do I raise a hostel maintenance request?", a: "Submit a ticket through Help & Support → Report an Issue, selecting 'Hostel' as the category. The hostel office typically responds within 24 hours." },
  { q: "Can I change my elective after registration closes?", a: "Elective changes after the deadline require written approval from your academic advisor, submitted through the Academic Cell." },
];
