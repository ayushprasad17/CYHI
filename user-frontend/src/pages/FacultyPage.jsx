import React, { useEffect, useState } from "react";
import { Search, Mail, Phone, MapPin, X } from "lucide-react";
import { C } from "../theme";
import { Card, SectionTitle, GhostButton, Avatar } from "../components/ui";
import { FACULTY, DEPARTMENTS } from "../data/mockData";
import { apiGet } from "../api";

export function FacultyPage() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [selected, setSelected] = useState(null);
  const [faculty, setFaculty] = useState(FACULTY);

  useEffect(() => {
    apiGet("/faculty", null).then((data) => {
      if (Array.isArray(data) && data.length) {
        setFaculty(data.map((f) => ({ ...f, dept: f.dept || f.department, role: f.role || f.designation })));
      }
    });
  }, []);

  const departments = ["All Departments", ...new Set(faculty.map((f) => f.dept).filter(Boolean))];
  const filtered = faculty.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()) &&
    (dept === "All Departments" || f.dept === dept)
  );

  return (
    <div className="p-4 lg:p-6">
      <SectionTitle title="Faculty Directory" subtitle="Search faculty by name, department or subject." />
      <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.faint }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search faculty…" className="w-full rounded-lg pl-9 pr-3 py-2.5 text-[13px] outline-none" style={{ background: "#0B1120", border: `1px solid ${C.border}`, color: C.text }} />
        </div>
        <select value={dept} onChange={(e) => setDept(e.target.value)} className="rounded-lg px-3 py-2.5 text-[13px] outline-none" style={{ background: "#0B1120", border: `1px solid ${C.border}`, color: C.text }}>
          {(departments.length ? departments : DEPARTMENTS).map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((f) => (
          <Card key={f.id} className="p-4">
            <div className="flex items-center gap-3 mb-3"><Avatar size={44} /><div className="min-w-0"><div className="text-[13.5px] font-semibold truncate" style={{ color: C.text }}>{f.name}</div><div className="text-[11.5px] truncate" style={{ color: C.faint }}>{f.role}</div></div></div>
            <div className="text-[12px] mb-1 flex items-center gap-1.5" style={{ color: C.sub }}><Mail size={12} /> {f.email}</div>
            <div className="text-[12px] mb-4 flex items-center gap-1.5" style={{ color: C.sub }}><Phone size={12} /> {f.phone}</div>
            <GhostButton onClick={() => setSelected(f)} className="w-full text-center">View Profile</GhostButton>
          </Card>
        ))}
      </div>
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/70" onClick={() => setSelected(null)} /><Card className="relative z-10 p-6 w-full max-w-sm"><button onClick={() => setSelected(null)} className="absolute top-4 right-4" style={{ color: C.faint }}><X size={18} /></button><div className="flex flex-col items-center text-center mb-4"><Avatar size={64} /><div className="text-[16px] font-semibold mt-3" style={{ color: C.text }}>{selected.name}</div><div className="text-[12.5px]" style={{ color: C.faint }}>{selected.role} · {selected.dept}</div></div><div className="space-y-2.5 text-[13px]" style={{ color: C.sub }}><div className="flex items-center gap-2"><Mail size={14} /> {selected.email}</div><div className="flex items-center gap-2"><Phone size={14} /> {selected.phone}</div><div className="flex items-center gap-2"><MapPin size={14} /> {selected.office}</div></div></Card></div>}
    </div>
  );
}
