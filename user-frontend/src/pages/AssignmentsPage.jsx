import React, { useEffect, useState } from "react";
import { C, grad } from "../theme";
import { ASSIGNMENTS_INIT } from "../data/mockData";
import { apiGet, apiRequest } from "../api";
import { Card, Badge, SectionTitle, PrimaryButton } from "../components/ui";

/* ----------------------------------------------------------------------- */
/*  ASSIGNMENTS PAGE                                                       */
/* ----------------------------------------------------------------------- */
export function AssignmentsPage({ assignments, setAssignments, showToast }) {
  const [tab, setTab] = useState("Upcoming");
  const [localAssignments, setLocalAssignments] = useState(assignments?.length ? assignments : ASSIGNMENTS_INIT);

  useEffect(() => {
    apiGet("/assignments?student_id=1", null).then((data) => {
      if (Array.isArray(data) && data.length) {
        setLocalAssignments(data.map((a) => ({ ...a, due: a.due || a.due_date, priority: a.priority || "Medium", status: a.status || "Not Submitted" })));
        setAssignments?.(data.map((a) => ({ ...a, due: a.due || a.due_date, priority: a.priority || "Medium", status: a.status || "Not Submitted" })));
      }
    });
  }, [setAssignments]);
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");

  const currentAssignments = localAssignments;
  const subjects = ["All Subjects", ...new Set(currentAssignments.map((a) => a.subject))];

  const tabbed = currentAssignments.filter((a) => {
    if (tab === "Upcoming") return a.status === "Not Submitted";
    if (tab === "Submitted") return a.status === "Submitted";
    return a.status === "Overdue";
  });
  const filtered = tabbed.filter((a) => subjectFilter === "All Subjects" || a.subject === subjectFilter);

  const counts = {
    Upcoming: currentAssignments.filter((a) => a.status === "Not Submitted").length,
    Submitted: currentAssignments.filter((a) => a.status === "Submitted").length,
    Overdue: currentAssignments.filter((a) => a.status === "Overdue").length,
  };

  const submit = (id) => {
    setLocalAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Submitted" } : a)));
    setAssignments?.((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Submitted" } : a)));
    apiRequest(`/assignments/${id}`, { method: "PUT", body: JSON.stringify({ status: "Submitted" }) }).catch(() => {});
    showToast("Assignment submitted");
  };

  return (
    <div className="p-4 lg:p-6">
      <SectionTitle title="Assignments" subtitle="Keep track of your coursework and deadlines." />

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="flex gap-2">
          {["Upcoming", "Submitted", "Overdue"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className="px-3.5 py-2 rounded-xl text-[12.5px] font-medium"
              style={{ background: tab === t ? grad : "#0E1424", color: tab === t ? "white" : C.sub, border: `1px solid ${tab === t ? "transparent" : C.border}` }}>
              {t} ({counts[t]})
            </button>
          ))}
        </div>
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="sm:ml-auto rounded-lg px-3 py-2 text-[13px] outline-none" style={{ background: "#0B1120", border: `1px solid ${C.border}`, color: C.text }}>
          {subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_100px_80px_130px] px-4 py-3 text-[11.5px] font-semibold" style={{ color: C.faint, borderBottom: `1px solid ${C.border}` }}>
          <div>SUBJECT</div><div>ASSIGNMENT TITLE</div><div>DUE DATE</div><div>PRIORITY</div><div>STATUS</div>
        </div>
        {filtered.length === 0 && <div className="p-6 text-[13px] text-center" style={{ color: C.faint }}>Nothing here — you're all caught up.</div>}
        {filtered.map((a, i) => (
          <div key={a.id} className="grid grid-cols-[1fr_1fr_100px_80px_130px] px-4 py-3.5 items-center text-[13px]" style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ color: C.sub }}>{a.subject}</div>
            <div style={{ color: C.text }} className="font-medium pr-2">{a.title}</div>
            <div style={{ color: C.faint }} className="text-[12px]">{a.due}</div>
            <div><Badge tone={a.priority.toLowerCase()}>{a.priority}</Badge></div>
            <div className="flex items-center gap-2">
              <Badge tone={a.status === "Submitted" ? "submitted" : a.status === "Overdue" ? "overdue" : "notsubmitted"}>{a.status === "Not Submitted" ? "Not Submitted" : a.status}</Badge>
            </div>
          </div>
        ))}
      </Card>

      {tab !== "Submitted" && filtered.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2.5">
          {filtered.map((a) => (
            <PrimaryButton key={a.id} onClick={() => submit(a.id)} className="!py-2 !px-3.5 !text-[12.5px]">
              Submit "{a.title.length > 20 ? a.title.slice(0, 20) + "…" : a.title}"
            </PrimaryButton>
          ))}
        </div>
      )}
    </div>
  );
}
