import React, { useEffect, useState, useMemo } from "react";
import { Search, Download } from "lucide-react";
import { C } from "../theme";
import { Card, Badge, SectionTitle, PrimaryButton, GhostButton } from "../components/ui";
import { CATEGORIES } from "../data/mockData";
import { apiGet } from "../api";

/* ----------------------------------------------------------------------- */
/*  NOTICES PAGE                                                           */
/* ----------------------------------------------------------------------- */
export function NoticesPage({ notices, setNotices, showToast }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(notices[0]);
  useEffect(() => { apiGet("/notices", null).then((data) => { if (Array.isArray(data) && data.length) { const mapped = data.map(n => ({ ...n, body: n.body || n.description, date: n.date || n.notice_date, priority: n.priority || "Medium", unread: n.unread ?? true })); setNotices(mapped); setSelected(mapped[0]); } }); }, [setNotices]);

  const filtered = useMemo(() => {
    return notices.filter((n) => {
      const matchCat = category === "All" || n.category === category;
      const matchQ = n.title.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [notices, category, query]);

  const markRead = (id) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    showToast("Marked as read");
  };

  return (
    <div className="p-4 lg:p-6">
      <SectionTitle title="Notice Center" subtitle="Stay updated with the latest campus notices and announcements." />

      <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.faint }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notices…"
            className="w-full rounded-lg pl-9 pr-3 py-2.5 text-[13px] outline-none" style={{ background: "#0B1120", border: `1px solid ${C.border}`, color: C.text }} />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg px-3 py-2.5 text-[13px] outline-none" style={{ background: "#0B1120", border: `1px solid ${C.border}`, color: C.text }}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 space-y-2.5 max-h-[65vh] overflow-y-auto pr-1">
          {filtered.length === 0 && <div className="text-[13px] p-4" style={{ color: C.faint }}>No notices match your search.</div>}
          {filtered.map((n) => (
            <button key={n.id} onClick={() => setSelected(n)} className="w-full text-left rounded-xl p-3.5"
              style={{ background: selected?.id === n.id ? "rgba(91,107,245,0.12)" : "#0E1424", border: `1px solid ${selected?.id === n.id ? "rgba(91,107,245,0.4)" : C.border}` }}>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge tone={n.priority.toLowerCase()}>{n.priority}</Badge>
                {n.unread && <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.indigo }} />}
              </div>
              <div className="text-[13px] font-medium leading-snug mb-1" style={{ color: C.text }}>{n.title}</div>
              <div className="text-[11px]" style={{ color: C.faint }}>{n.date} · {n.category}</div>
            </button>
          ))}
        </div>

        <Card className="lg:col-span-3 p-5 h-fit">
          {selected ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Badge tone={selected.priority.toLowerCase()}>{selected.priority}</Badge>
                <Badge>{selected.category}</Badge>
              </div>
              <h3 className="text-[16px] font-semibold mb-1.5" style={{ color: C.text }}>{selected.title}</h3>
              <div className="text-[12px] mb-4" style={{ color: C.faint }}>{selected.date}</div>
              <p className="text-[13.5px] leading-relaxed mb-6" style={{ color: C.sub }}>{selected.body}</p>
              <div className="flex gap-2.5">
                <PrimaryButton onClick={() => markRead(selected.id)}>Mark as Read</PrimaryButton>
                <GhostButton onClick={() => showToast("Notice downloaded")}><Download size={14} className="inline mr-1.5 -mt-0.5" />Download</GhostButton>
              </div>
            </>
          ) : (
            <div className="text-[13px]" style={{ color: C.faint }}>Select a notice to view details.</div>
          )}
        </Card>
      </div>
    </div>
  );
}
