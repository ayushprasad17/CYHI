export const initialAnnouncements = [
  { id: 1, title: 'Course Registration Deadline', category: 'Academic', priority: 'Urgent', audience: 'All Students', date: '2026-09-15', status: 'Published' },
  { id: 2, title: 'Scholarship Application Open', category: 'Scholarship', priority: 'High', audience: 'All Students', date: '2026-09-12', status: 'Published' },
  { id: 3, title: 'Library Maintenance Notice', category: 'General', priority: 'Medium', audience: 'All Students', date: '2026-09-10', status: 'Published' },
  { id: 4, title: 'Mid-Semester Exam Schedule Released', category: 'Academic', priority: 'High', audience: 'All Students', date: '2026-09-08', status: 'Published' },
  { id: 5, title: 'Hostel Fee Payment Reminder', category: 'Finance', priority: 'High', audience: 'Hostel Students', date: '2026-09-05', status: 'Published' },
  { id: 6, title: 'Campus Clean-Up Drive', category: 'General', priority: 'Low', audience: 'All Students', date: '2026-09-03', status: 'Draft' },
  { id: 7, title: 'Annual Sports Meet Registration', category: 'Sports', priority: 'Medium', audience: 'All Students', date: '2026-09-01', status: 'Draft' },
];

export const initialEvents = [
  { id: 1, title: 'AI & Machine Learning Workshop', category: 'Workshop', date: '2026-09-20', time: '14:00', location: 'Main Auditorium', registered: 87, status: 'Upcoming', reg: 'Open' },
  { id: 2, title: 'Annual Cultural Fest 2026', category: 'Cultural', date: '2026-10-05', time: '10:00', location: 'Open Air Theatre', registered: 320, status: 'Upcoming', reg: 'Open' },
  { id: 3, title: 'Placement Preparation Seminar', category: 'Seminar', date: '2026-09-25', time: '11:00', location: 'Seminar Hall A', registered: 156, status: 'Upcoming', reg: 'Closed' },
  { id: 4, title: 'Hackathon 2026', category: 'Competition', date: '2026-10-15', time: '09:00', location: 'Tech Lab Block', registered: 62, status: 'Upcoming', reg: 'Open' },
  { id: 5, title: 'Environment Awareness Drive', category: 'Social', date: '2026-09-05', time: '08:00', location: 'Campus Grounds', registered: 210, status: 'Completed', reg: 'Closed' },
  { id: 6, title: 'Guest Lecture: Entrepreneurship', category: 'Lecture', date: '2026-08-28', time: '15:00', location: 'Conference Room', registered: 95, status: 'Completed', reg: 'Closed' },
];

export const initialClubs = [
  { id: 1, name: 'Coding Club', category: 'Technical', status: 'Active', desc: 'A community for programming enthusiasts to learn, share, and collaborate on software projects.', coordinator: 'Prof. Sharma', members: 128, contact: 'coding@university.edu' },
  { id: 2, name: 'Robotics Club', category: 'Technical', status: 'Active', desc: 'Building and programming robots for competitions and innovation challenges.', coordinator: 'Prof. Verma', members: 65, contact: 'robotics@university.edu' },
  { id: 3, name: 'Entrepreneurship Cell', category: 'Business', status: 'Active', desc: 'Fostering entrepreneurial spirit through workshops, mentorship and startup events.', coordinator: 'Prof. Kapoor', members: 92, contact: 'ecell@university.edu' },
  { id: 4, name: 'Literary Club', category: 'Cultural', status: 'Active', desc: 'Celebrating literature through reading groups, debates, creative writing, and storytelling.', coordinator: 'Prof. Mehta', members: 47, contact: 'literary@university.edu' },
  { id: 5, name: 'Sports Club', category: 'Sports', status: 'Active', desc: 'Organizing inter-college and intra-college sports activities and annual sports meet.', coordinator: 'Coach Rajput', members: 210, contact: 'sports@university.edu' },
  { id: 6, name: 'Photography Club', category: 'Creative', status: 'Inactive', desc: 'Exploring visual storytelling through campus events, workshops and photo walks.', coordinator: 'Prof. Singh', members: 38, contact: 'photo@university.edu' },
];

export const initialResources = [
  { id: 1, name: 'Academic Calendar 2026-27', category: 'Academic', desc: 'Official academic calendar with exam dates, holidays, and semester schedule.', updated: '2026-09-01', status: 'Active', url: '#' },
  { id: 2, name: 'University Library Portal', category: 'Library', desc: 'Access digital books, research papers, journals, and library resources.', updated: '2026-08-28', status: 'Active', url: '#' },
  { id: 3, name: 'Hostel Allotment & Rules', category: 'Hostel', desc: 'Hostel allocation process, room allotment, and rules & regulations for residents.', updated: '2026-08-20', status: 'Active', url: '#' },
  { id: 4, name: 'Campus Transport Schedule', category: 'Transport', desc: 'Bus timings, routes, and transport pass application for all campus buses.', updated: '2026-09-05', status: 'Active', url: '#' },
  { id: 5, name: 'Scholarship Portal', category: 'Finance', desc: 'Apply for scholarships, check eligibility, and track application status.', updated: '2026-09-10', status: 'Active', url: '#' },
  { id: 6, name: 'Placement Cell', category: 'Placement', desc: 'Job listings, internship opportunities, placement prep resources and company drives.', updated: '2026-09-08', status: 'Active', url: '#' },
  { id: 7, name: 'Important Forms & Downloads', category: 'Admin', desc: 'Download bonafide certificates, NOCs, fee receipts, and other administrative forms.', updated: '2026-08-15', status: 'Active', url: '#' },
  { id: 8, name: 'Student Grievance Portal', category: 'Admin', desc: 'Submit academic and non-academic grievances and track resolution status.', updated: '2026-07-30', status: 'Inactive', url: '#' },
];

export const initialStudents = [
  { id: 1, name: 'Ayush Sharma', email: 'ayush.sharma@university.edu', roll: 'CSE23001', dept: 'CSE', sem: 'Semester 3', status: 'Active', joined: 'Aug 2025' },
  { id: 2, name: 'Rahul Kumar', email: 'rahul.kumar@university.edu', roll: 'ECE22045', dept: 'ECE', sem: 'Semester 5', status: 'Active', joined: 'Aug 2024' },
  { id: 3, name: 'Priya Mehta', email: 'priya.mehta@university.edu', roll: 'MBA26012', dept: 'MBA', sem: 'Semester 1', status: 'Active', joined: 'Sep 2026' },
  { id: 4, name: 'Sneha Patel', email: 'sneha.patel@university.edu', roll: 'ME23078', dept: 'ME', sem: 'Semester 7', status: 'Active', joined: 'Aug 2023' },
  { id: 5, name: 'Vikram Singh', email: 'vikram.singh@university.edu', roll: 'CSE22033', dept: 'CSE', sem: 'Semester 5', status: 'Active', joined: 'Aug 2024' },
  { id: 6, name: 'Ananya Rao', email: 'ananya.rao@university.edu', roll: 'CE23019', dept: 'CE', sem: 'Semester 3', status: 'Inactive', joined: 'Aug 2025' },
  { id: 7, name: 'Karan Mehra', email: 'karan.mehra@university.edu', roll: 'ECE23011', dept: 'ECE', sem: 'Semester 3', status: 'Active', joined: 'Aug 2025' },
  { id: 8, name: 'Divya Nair', email: 'divya.nair@university.edu', roll: 'CSE21005', dept: 'CSE', sem: 'Semester 7', status: 'Active', joined: 'Aug 2023' },
  { id: 9, name: 'Arjun Iyer', email: 'arjun.iyer@university.edu', roll: 'ME22019', dept: 'ME', sem: 'Semester 5', status: 'Active', joined: 'Aug 2024' },
  { id: 10, name: 'Neha Gupta', email: 'neha.gupta@university.edu', roll: 'MBA25004', dept: 'MBA', sem: 'Semester 3', status: 'Active', joined: 'Aug 2025' },
];

export const STUDENTS_PER_PAGE = 6;

export const pageTitles = {
  dashboard: 'Dashboard',
  announcements: 'Announcements',
  events: 'Events',
  clubs: 'Clubs',
  resources: 'Resources',
  students: 'Students',
  analytics: 'Analytics',
};
