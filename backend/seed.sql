USE student_info_hub;

INSERT INTO assignments (title, description, subject, due_date, status, student_id) VALUES
('Arrays and Linked Lists','Practice arrays and linked list operations.','Data Structures','2026-10-16','Not Submitted',1),
('Portfolio Website','Build and submit a responsive portfolio website.','Web Development','2026-10-18','Submitted',1),
('Process Scheduling Report','Prepare a report on CPU scheduling algorithms.','Operating Systems','2026-10-20','Not Submitted',1),
('OSI Layer Case Study','Prepare a case study covering the OSI model.','Computer Networks','2026-10-22','Not Submitted',1),
('Graph Theory Problem Set','Solve the assigned graph theory problems.','Discrete Mathematics','2026-10-10','Overdue',1);

INSERT INTO faculty (faculty_id,name,department,designation,email,phone) VALUES
('FAC001','Dr. R. Sharma','Computer Science','Professor & Head','r.sharma@iiitdmj.ac.in','+91 731 233 0001'),
('FAC002','Prof. A. Mehta','Information Technology','Associate Professor','a.mehta@iiitdmj.ac.in','+91 731 233 0002'),
('FAC003','Dr. S. Khan','Mathematics','Assistant Professor','s.khan@iiitdmj.ac.in','+91 731 233 0003'),
('FAC004','Prof. P. Gupta','Electronics & Comm.','Assistant Professor','p.gupta@iiitdmj.ac.in','+91 731 233 0004'),
('FAC005','Dr. N. Verma','Computer Science','Professor','n.verma@iiitdmj.ac.in','+91 731 233 0005'),
('FAC006','Prof. R. Singh','Mechanical Engg.','Associate Professor','r.singh@iiitdmj.ac.in','+91 731 233 0006');

INSERT INTO resources (title,description,subject,resource_type,resource_url,uploaded_by) VALUES
('Library','Books, e-resources, study space','Campus','Facility',NULL,'Admin'),
('Laboratories','Computer, chemistry, core labs','Campus','Facility',NULL,'Admin'),
('Hostels','Boys & girls hostels','Campus','Facility',NULL,'Admin'),
('Transport','Campus buses & connectivity','Campus','Facility',NULL,'Admin'),
('Sports Facilities','Indoor & outdoor sports','Campus','Facility',NULL,'Admin'),
('Clubs & Societies','Cultural, tech & sports clubs','Campus','Facility',NULL,'Admin');

INSERT INTO notifications (student_id,title,message,notification_type,is_read) VALUES
(1,'New Notice: Mid-semester examination schedule released','Check the latest examination notice.','Academic',FALSE),
(1,'Event: Tech Fest 2026 coming soon','Tech Fest registration is available.','Events',FALSE),
(1,'Assignment Deadline: DSA Assignment','An assignment deadline is approaching.','Deadlines',FALSE),
(1,'Timetable Update','Your timetable has been updated.','Academic',TRUE),
(1,'Campus Alert','A new campus update is available.','Administration',TRUE);

INSERT INTO profiles (student_id,bio) VALUES (1,'B.Tech CSE student profile');
