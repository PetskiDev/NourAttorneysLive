"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { z } from "zod";
import Link from "next/link";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const ServiceSchema = z.object({
  id: z.number().int(),
  expertiseId: z.number().int(),
  title: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const ExpertiseSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  services: z.array(ServiceSchema).default([]),
});

type Expertise = z.infer<typeof ExpertiseSchema>;

const ExpertiseArraySchema = z.array(ExpertiseSchema);

export default function AdminExpertisePage() {
  const [expertise, setExpertise] = useState<Expertise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({ title: "" });

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  async function loadAll() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/expertise", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const raw = (await res.json()) as unknown;
      const parsed = ExpertiseArraySchema.parse(raw);
      setExpertise(parsed);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadAll();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/expertise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: createForm.title.trim(),
        }),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      setCreateForm({ title: "" });
      await loadAll();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setCreating(false);
    }
  }

  async function deleteExpertise(id: number) {
    setError(null);
    try {
      const res = await fetch(`/api/expertise/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      await loadAll();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

  function startEdit(e: Expertise) {
    setEditingId(e.id);
    setEditTitle(e.title);
  }

  async function saveEdit(id: number) {
    setError(null);
    try {
      const res = await fetch(`/api/expertise/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle.trim() }),
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      setEditingId(null);
      setEditTitle("");
      await loadAll();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
  }

  async function addService(expertiseId: number, form: { title: string; slug: string }) {
    setError(null);
    try {
      const res = await fetch(`/api/expertise/${expertiseId}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title.trim(), slug: form.slug.trim() }),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      await loadAll();
      setExpandedId(expertiseId);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

  async function deleteService(serviceId: number) {
    setError(null);
    try {
      const res = await fetch(`/api/services/${serviceId}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      await loadAll();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0, marginBottom: 16 }}>Admin · Expertise</h1>
      <p style={{ color: "#666", marginTop: 0, marginBottom: 24 }}>
        Manage expertise categories and their services. Slugs must be lowercase and hyphen-separated.
      </p>

      {error && (
        <div style={{ marginBottom: 16, color: "#b00020" }} role="alert">
          {error}
        </div>
      )}

      <form
        onSubmit={handleCreate}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 160px",
          gap: 8,
          alignItems: "end",
          marginBottom: 24,
          maxWidth: 900,
        }}
      >
        <div>
          <label htmlFor="title" style={{ display: "block", fontWeight: 600 }}>
            Title
          </label>
          <input
            id="title"
            required
            value={createForm.title}
            onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <button type="submit" disabled={creating}>
            {creating ? "Adding..." : "Add Expertise"}
          </button>
        </div>
      </form>

      <div style={{ display: "grid", gap: 12 }}>
        {isLoading ? (
          <div>Loading...</div>
        ) : expertise.length === 0 ? (
          <div>No expertise yet.</div>
        ) : (
          expertise.map((e) => (
            <div key={e.id} style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  background: "#fafafa",
                }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                  <button onClick={() => startEdit(e)}>Edit</button>
                  {editingId === e.id ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        value={editTitle}
                        onChange={(ev) => setEditTitle(ev.target.value)}
                        style={{ minWidth: 220 }}
                      />
                      <button onClick={() => void saveEdit(e.id)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <strong>
                      {e.title} ({e.services?.length ?? 0})
                    </strong>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setExpandedId((id) => (id === e.id ? null : e.id))}>
                    {expandedId === e.id ? "Hide services" : "Show services"}
                  </button>
                  <button onClick={() => void deleteExpertise(e.id)}>Delete</button>
                </div>
              </div>

              {expandedId === e.id ? (
                <ServicesPanel
                  expertise={e}
                  onCreate={(form) => void addService(e.id, form)}
                  onDelete={(serviceId) => void deleteService(serviceId)}
                />
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ServicesPanel({
  expertise,
  onCreate,
  onDelete,
}: {
  expertise: Expertise;
  onCreate: (form: { title: string; slug: string }) => void;
  onDelete: (serviceId: number) => void;
}) {
  const [form, setForm] = useState({ title: "", slug: "" });
  return (
    <div style={{ padding: 12 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate(form);
          setForm({ title: "", slug: "" });
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 140px",
          gap: 8,
          alignItems: "end",
          marginBottom: 12,
          maxWidth: 800,
        }}
      >
        <div>
          <label style={{ display: "block", fontWeight: 600 }}>Service title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600 }}>Service slug</label>
          <input
            required
            pattern={slugRegex.source}
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          />
        </div>
        <div>
          <button type="submit">Add Service</button>
        </div>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Title</th>
            <th style={th}>Slug</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expertise.services.length === 0 ? (
            <tr>
              <td colSpan={3} style={td}>No services yet.</td>
            </tr>
          ) : (
            expertise.services.map((s) => (
              <tr key={s.id}>
                <td style={td}>
                  <Link href={`/services/${s.slug}`} target="_blank">{s.title}</Link>
                </td>
                <td style={td}>{s.slug}</td>
                <td style={td}>
                  <button onClick={() => onDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  padding: "8px 12px",
};

const td: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "8px 12px",
  verticalAlign: "middle",
};


