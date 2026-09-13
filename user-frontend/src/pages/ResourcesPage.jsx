import React, { useEffect, useState } from "react";
import { X, Library, FileText, Building2, Bus, Dumbbell, Users } from "lucide-react";
import { C } from "../theme";
import { Card, SectionTitle, GhostButton } from "../components/ui";
import { RESOURCES } from "../data/mockData";
import { apiGet } from "../api";

const ICONS = { Library, Laboratories: FileText, "Hostels": Building2, Transport: Bus, "Sports Facilities": Dumbbell, "Clubs & Societies": Users };
export function ResourcesPage() {
  const [selected, setSelected] = useState(null);
  const [resources, setResources] = useState(RESOURCES);
  useEffect(() => {
    apiGet("/resources", null).then((data) => {
      if (Array.isArray(data) && data.length) setResources(data.map((r) => ({ ...r, name: r.name || r.title, blurb: r.blurb || r.description, detail: r.detail || r.description, icon: ICONS[r.name || r.title] || FileText })));
    });
  }, []);
  return <div className="p-4 lg:p-6"><SectionTitle title="Campus Resources" subtitle="Access all important campus facilities and resources." /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{resources.map((r) => { const Icon = r.icon || FileText; return <Card key={r.id} className="p-5"><div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(91,107,245,0.14)" }}><Icon size={18} style={{ color: "#A6B0FF" }} /></div><div className="text-[14.5px] font-semibold mb-1" style={{ color: C.text }}>{r.name}</div><div className="text-[12.5px] mb-4" style={{ color: C.sub }}>{r.blurb}</div><GhostButton onClick={() => setSelected(r)} className="w-full text-center">View Details</GhostButton></Card>; })}</div>{selected && <div className="fixed inset-0 z-50 flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/70" onClick={() => setSelected(null)} /><Card className="relative z-10 p-6 w-full max-w-md"><button onClick={() => setSelected(null)} className="absolute top-4 right-4" style={{ color: C.faint }}><X size={18} /></button><div className="text-[16px] font-semibold mb-2" style={{ color: C.text }}>{selected.name}</div><p className="text-[13.5px] leading-relaxed" style={{ color: C.sub }}>{selected.detail}</p></Card></div>}</div>;
}
