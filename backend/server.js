import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const asyncRoute = (fn) => (req,res) => Promise.resolve(fn(req,res)).catch(e => res.status(500).json({message:"Server error", error:e.message}));

app.get("/", (req,res)=>res.json({message:"Student Information Hub Backend is running!"}));
app.post("/api/login", asyncRoute(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ? LIMIT 1",
    [username]
  );

  if (rows.length === 0) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const user = rows[0];

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role,
      studentId: user.student_id
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      studentId: user.student_id
    }
  });
}));
app.get("/api/test-db", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT 1 AS connected"); res.json({message:"Database connected successfully!",result:rows}); }));

app.get("/api/students", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM students ORDER BY id DESC"); res.json(rows); }));
app.delete("/api/students/:id", asyncRoute(async (req,res)=>{ await db.query("DELETE FROM students WHERE id=?",[req.params.id]); res.status(204).send(); }));

app.get("/api/notices", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM notices ORDER BY notice_date DESC,id DESC"); res.json(rows); }));
app.post("/api/notices", asyncRoute(async (req,res)=>{ const {title,description='',category='General',posted_by='Admin',notice_date=null,priority='Medium',audience='All Students',status='Published'}=req.body; const [r]=await db.query("INSERT INTO notices (title,description,category,posted_by,notice_date,priority,audience,status) VALUES (?,?,?,?,?,?,?,?)",[title,description,category,posted_by,notice_date,priority,audience,status]); const [rows]=await db.query("SELECT * FROM notices WHERE id=?",[r.insertId]); res.status(201).json(rows[0]); }));
app.put("/api/notices/:id", asyncRoute(async (req,res)=>{ const {title,description='',category='General',posted_by='Admin',notice_date=null,priority='Medium',audience='All Students',status='Published'}=req.body; await db.query("UPDATE notices SET title=?,description=?,category=?,posted_by=?,notice_date=?,priority=?,audience=?,status=? WHERE id=?",[title,description,category,posted_by,notice_date,priority,audience,status,req.params.id]); const [rows]=await db.query("SELECT * FROM notices WHERE id=?",[req.params.id]); res.json(rows[0]); }));
app.delete("/api/notices/:id", asyncRoute(async (req,res)=>{ await db.query("DELETE FROM notices WHERE id=?",[req.params.id]); res.status(204).send(); }));

app.get("/api/events", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM events ORDER BY event_date ASC,start_time ASC"); res.json(rows); }));
app.post("/api/events", asyncRoute(async (req,res)=>{ const {title,description='',category='Workshop',event_date,start_time=null,end_time=null,location='TBA',organizer='Admin',registered=0,status='Upcoming',reg='Open'}=req.body; const [r]=await db.query("INSERT INTO events (title,description,event_date,start_time,end_time,location,organizer,category,registered,status,reg) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[title,description,event_date,start_time,end_time,location,organizer,category,registered,status,reg]); const [rows]=await db.query("SELECT * FROM events WHERE id=?",[r.insertId]); res.status(201).json(rows[0]); }));
app.put("/api/events/:id", asyncRoute(async (req,res)=>{ const {title,description='',category='Workshop',event_date,start_time=null,end_time=null,location='TBA',organizer='Admin',registered=0,status='Upcoming',reg='Open'}=req.body; await db.query("UPDATE events SET title=?,description=?,event_date=?,start_time=?,end_time=?,location=?,organizer=?,category=?,registered=?,status=?,reg=? WHERE id=?",[title,description,event_date,start_time,end_time,location,organizer,category,registered,status,reg,req.params.id]); const [rows]=await db.query("SELECT * FROM events WHERE id=?",[req.params.id]); res.json(rows[0]); }));
app.delete("/api/events/:id", asyncRoute(async (req,res)=>{ await db.query("DELETE FROM events WHERE id=?",[req.params.id]); res.status(204).send(); }));

app.get("/api/clubs", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM clubs ORDER BY id DESC"); res.json(rows); }));
app.post("/api/clubs", asyncRoute(async (req,res)=>{ const {name,category='General',status='Active',description='',coordinator='',members=0,contact=''}=req.body; const [r]=await db.query("INSERT INTO clubs (name,category,status,description,coordinator,members,contact) VALUES (?,?,?,?,?,?,?)",[name,category,status,description,coordinator,members,contact]); const [rows]=await db.query("SELECT * FROM clubs WHERE id=?",[r.insertId]); res.status(201).json(rows[0]); }));
app.put("/api/clubs/:id", asyncRoute(async (req,res)=>{ const {name,category='General',status='Active',description='',coordinator='',members=0,contact=''}=req.body; await db.query("UPDATE clubs SET name=?,category=?,status=?,description=?,coordinator=?,members=?,contact=? WHERE id=?",[name,category,status,description,coordinator,members,contact,req.params.id]); const [rows]=await db.query("SELECT * FROM clubs WHERE id=?",[req.params.id]); res.json(rows[0]); }));
app.delete("/api/clubs/:id", asyncRoute(async (req,res)=>{ await db.query("DELETE FROM clubs WHERE id=?",[req.params.id]); res.status(204).send(); }));

app.get("/api/resources", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM resources ORDER BY id DESC"); res.json(rows); }));
app.post("/api/resources", asyncRoute(async (req,res)=>{ const {title,description='',subject=null,resource_type='Academic',resource_url='',uploaded_by='Admin',category='Academic',status='Active'}=req.body; const [r]=await db.query("INSERT INTO resources (title,description,subject,resource_type,resource_url,uploaded_by,category,status) VALUES (?,?,?,?,?,?,?,?)",[title,description,subject,resource_type,resource_url,uploaded_by,category,status]); const [rows]=await db.query("SELECT * FROM resources WHERE id=?",[r.insertId]); res.status(201).json(rows[0]); }));
app.put("/api/resources/:id", asyncRoute(async (req,res)=>{ const {title,description='',category='Academic',status='Active',resource_url=''}=req.body; await db.query("UPDATE resources SET title=?,description=?,resource_url=?,category=?,status=? WHERE id=?",[title,description,resource_url,category,status,req.params.id]); const [rows]=await db.query("SELECT * FROM resources WHERE id=?",[req.params.id]); res.json(rows[0]); }));
app.delete("/api/resources/:id", asyncRoute(async (req,res)=>{ await db.query("DELETE FROM resources WHERE id=?",[req.params.id]); res.status(204).send(); }));

app.get("/api/faculty", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM faculty ORDER BY name"); res.json(rows); }));
app.get("/api/timetable", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM timetable ORDER BY FIELD(day,'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'),start_time ASC"); res.json(rows); }));
app.get("/api/attendance", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM attendance WHERE student_id=? ORDER BY subject",[req.query.student_id||1]); res.json(rows); }));
app.get("/api/assignments", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM assignments WHERE student_id=? OR student_id IS NULL ORDER BY due_date ASC,id DESC",[req.query.student_id||1]); res.json(rows); }));
app.put("/api/assignments/:id", asyncRoute(async (req,res)=>{ await db.query("UPDATE assignments SET status=? WHERE id=?",[req.body.status||"Pending",req.params.id]); const [rows]=await db.query("SELECT * FROM assignments WHERE id=?",[req.params.id]); res.json(rows[0]||null); }));
app.get("/api/notifications", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT * FROM notifications WHERE student_id=? OR student_id IS NULL ORDER BY created_at DESC,id DESC",[req.query.student_id||1]); res.json(rows); }));
app.put("/api/notifications/:id/read", asyncRoute(async (req,res)=>{ await db.query("UPDATE notifications SET is_read=TRUE WHERE id=?",[req.params.id]); res.json({success:true}); }));
app.put("/api/notifications/mark-all-read", asyncRoute(async (req,res)=>{ await db.query("UPDATE notifications SET is_read=TRUE WHERE student_id=? OR student_id IS NULL",[req.query.student_id||1]); res.json({success:true}); }));
app.get("/api/profile", asyncRoute(async (req,res)=>{ const [rows]=await db.query("SELECT s.*,p.bio,p.profile_image,p.date_of_birth,p.gender,p.blood_group,p.guardian_name,p.guardian_phone FROM students s LEFT JOIN profiles p ON p.student_id=s.id WHERE s.id=?",[req.query.student_id||1]); res.json(rows[0]||null); }));
app.put("/api/profile", asyncRoute(async (req,res)=>{ await db.query("UPDATE students SET email=?,phone=?,address=? WHERE id=?",[req.body.email,req.body.phone,req.body.address,req.query.student_id||1]); const [rows]=await db.query("SELECT * FROM students WHERE id=?",[req.query.student_id||1]); res.json(rows[0]||null); }));

const PORT=process.env.PORT||5001;
app.listen(PORT,()=>console.log(`Backend running on http://localhost:${PORT}`));
setInterval(() => {}, 1000);
