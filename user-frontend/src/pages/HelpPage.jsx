import React, { useState } from "react";
import { Search, ChevronDown, Phone, MessageCircle, ShieldAlert, LifeBuoy, ChevronRight } from "lucide-react";
import { C } from "../theme";
import { Card, SectionTitle } from "../components/ui";
import { FAQS } from "../data/mockData";

/* ----------------------------------------------------------------------- */
/*  HELP & SUPPORT PAGE                                                    */
/* ----------------------------------------------------------------------- */
export function HelpPage({ showToast }) {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const filtered = FAQS.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-4 lg:p-6">
      <SectionTitle title="Help & Support" subtitle="Here to help find answers or get in touch with our support team." />

      <div className="relative mb-5 max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.faint }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for help…"
          className="w-full rounded-lg pl-9 pr-3 py-2.5 text-[13px] outline-none" style={{ background: "#0B1120", border: `1px solid ${C.border}`, color: C.text }} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {[
          { icon: MessageCircle, title: "FAQ", desc: "Common questions and answers", act: () => document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" }) },
          { icon: ShieldAlert, title: "Report an Issue", desc: "Report technical or academic issues", act: () => showToast("Issue report form opened") },
          { icon: LifeBuoy, title: "Contact Support", desc: "Get help from our support team", act: () => showToast("Support chat opened") },
        ].map((c) => (
          <Card key={c.title} className="p-4 cursor-pointer" >
            <button onClick={c.act} className="w-full text-left flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(91,107,245,0.14)" }}>
                <c.icon size={16} style={{ color: "#A6B0FF" }} />
              </div>
              <div>
                <div className="text-[13.5px] font-semibold" style={{ color: C.text }}>{c.title}</div>
                <div className="text-[12px] mt-0.5" style={{ color: C.sub }}>{c.desc}</div>
              </div>
            </button>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2" style={{ scrollMarginTop: "80px" }}>
          <div id="faq-section" className="text-[13.5px] font-semibold mb-3" style={{ color: C.text }}>Frequently Asked Questions</div>
          <div className="space-y-2">
            {filtered.map((f, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ background: "#0B1120", border: `1px solid ${C.border}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between px-4 py-3 text-left">
                  <span className="text-[13px] font-medium" style={{ color: C.text }}>{f.q}</span>
                  <ChevronDown size={15} style={{ color: C.faint, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
                </button>
                {openFaq === i && <div className="px-4 pb-3.5 text-[12.5px] leading-relaxed" style={{ color: C.sub }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="text-[13.5px] font-semibold mb-3" style={{ color: C.text }}>Quick Links</div>
            <div className="space-y-2.5 text-[13px]" style={{ color: C.sub }}>
              {["Academic Calendar", "Examination Cell", "Placement Cell", "Grievance Redressal", "Student Handbook", "IT Support"].map((l) => (
                <div key={l} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors" onClick={() => showToast(`Opening ${l}`)}>
                  <ChevronRight size={13} /> {l}
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-[13.5px] font-semibold mb-3" style={{ color: C.text }}>Emergency Contacts</div>
            <div className="space-y-2.5 text-[12.5px]" style={{ color: C.sub }}>
              <div className="flex items-center gap-2"><Phone size={13} /> Security: 100</div>
              <div className="flex items-center gap-2"><Phone size={13} /> Medical Center: 108</div>
              <div className="flex items-center gap-2"><Phone size={13} /> Warden Office: +91 731 233 0099</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
