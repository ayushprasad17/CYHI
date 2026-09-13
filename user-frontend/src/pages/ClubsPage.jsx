import React, { useEffect, useState } from "react";
import { C } from "../theme";
import { apiGet } from "../api";

export function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/clubs", []).then((data) => {
      setClubs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: C.text }}
        >
          Clubs & Societies
        </h1>

        <p className="mt-1 text-sm" style={{ color: C.sub }}>
          Explore student clubs and societies on campus.
        </p>
      </div>

      {loading ? (
        <div style={{ color: C.sub }}>Loading clubs...</div>
      ) : clubs.length === 0 ? (
        <div
          className="rounded-xl border p-6"
          style={{
            background: C.card,
            borderColor: C.border,
            color: C.sub,
          }}
        >
          No clubs available yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="rounded-2xl border p-5 shadow-sm"
              style={{
                background: C.card,
                borderColor: C.border,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: C.text }}
                >
                  {club.name}
                </h2>

                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: "#E8F5E9",
                    color: "#2E7D32",
                  }}
                >
                  {club.status || "Active"}
                </span>
              </div>

              <p
                className="mt-2 text-sm"
                style={{ color: C.sub }}
              >
                {club.category || "General"}
              </p>

              <p
                className="mt-4 text-sm leading-6"
                style={{ color: C.text }}
              >
                {club.description || "No description available."}
              </p>

              <div
                className="mt-5 space-y-2 border-t pt-4 text-sm"
                style={{ borderColor: C.border, color: C.sub }}
              >
                <div>
                  <strong>Coordinator:</strong>{" "}
                  {club.coordinator || "Not specified"}
                </div>

                <div>
                  <strong>Members:</strong>{" "}
                  {club.members ?? 0}
                </div>

                <div>
                  <strong>Contact:</strong>{" "}
                  {club.contact || "Not specified"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
