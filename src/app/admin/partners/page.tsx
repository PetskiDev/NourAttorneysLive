"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import s from "../admin.module.css";
import { z } from "zod";

const PartnerSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  industry: z.string(),
  order: z.number().int().optional().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Partner = z.infer<typeof PartnerSchema>;
const PartnerArraySchema = z.array(PartnerSchema);

type EditablePartner = Pick<Partner, "name" | "industry">;

export default function AdminPartnersPage() {
  const [items, setItems] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState<EditablePartner>({ name: "", industry: "" });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditablePartner>({ name: "", industry: "" });
  const [local, setLocal] = useState<Partner[]>([]);
  const [reordering, setReordering] = useState(false);

  // Visual styles provided by CSS module ../admin.module.css

  async function loadAll() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/partners", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const raw = (await res.json()) as unknown;
      const parsed = PartnerArraySchema.parse(raw);
      setItems(parsed);
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

  useEffect(() => {
    setLocal(items);
  }, [items]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: createForm.name.trim(),
          industry: createForm.industry.trim(),
        }),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      setCreateForm({ name: "", industry: "" });
      await loadAll();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setCreating(false);
    }
  }

  function startEdit(p: Partner) {
    setEditingId(p.id);
    setEditForm({ name: p.name, industry: p.industry });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id: number) {
    setError(null);
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editForm.name.trim(), industry: editForm.industry.trim() }),
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      setEditingId(null);
      await loadAll();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

  async function deleteItem(id: number) {
    setError(null);
    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      await loadAll();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0, marginBottom: 16 }}>Admin · Partners</h1>
      <p style={{ color: "#666", marginTop: 0, marginBottom: 24 }}>
        Manage partners. Slug is derived from name on create and cannot be edited.
      </p>

      {error && (
        <div style={{ marginBottom: 16, color: "#b00020" }} role="alert">
          {error}
        </div>
      )}

      <div className={s.card}>
        <div className={s.cardHeader}>Add partner</div>
        <form onSubmit={handleCreate} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 160px", gap: 8, alignItems: "end", padding: 12, maxWidth: 1000 }}>
          <div>
            <label htmlFor="name" style={{ display: "block", fontWeight: 600 }}>Name</label>
            <input id="name" required value={createForm.name} onChange={(e) => setCreateForm((f) => ({ ...f, name: e.target.value }))} className={s.input} />
          </div>
          <div>
            <label htmlFor="industry" style={{ display: "block", fontWeight: 600 }}>Industry</label>
            <input id="industry" required value={createForm.industry} onChange={(e) => setCreateForm((f) => ({ ...f, industry: e.target.value }))} className={s.input} />
          </div>
          <div>
            <button type="submit" disabled={creating} className={`${s.btn} ${s.btnPrimary}`}>{creating ? "Adding..." : "Add Partner"}</button>
          </div>
        </form>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", maxWidth: 900 }}>
          <thead>
            <tr>
              <th className={s.th}>Name</th>
              <th className={s.th}>Industry</th>
              <th className={s.th}>Slug</th>
              <th className={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className={s.td}>Loading...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={4} className={s.td}>No partners yet.</td>
              </tr>
            ) : (
              local.map((p, idx) => (
                <tr key={p.id}>
                  <td className={s.td}>
                    {editingId === p.id ? (
                      <input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} className={s.inputSmall} />
                    ) : (
                      p.name
                    )}
                  </td>
                  <td className={s.td}>
                    {editingId === p.id ? (
                      <input value={editForm.industry} onChange={(e) => setEditForm((f) => ({ ...f, industry: e.target.value }))} className={s.inputSmall} />
                    ) : (
                      p.industry
                    )}
                  </td>
                  <td className={s.td}>
                    <a href={`/partners/${p.slug}`} target="_blank" rel="noreferrer">
                      <code>{p.slug}</code>
                    </a>
                  </td>
                  <td className={s.td}>
                    {editingId === p.id ? (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => void saveEdit(p.id)} className={`${s.btn} ${s.btnPrimary}`}>Save</button>
                        <button onClick={cancelEdit} className={s.btn}>Cancel</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button
                          aria-label="Move up"
                          disabled={idx === 0 || reordering}
                          className={`${s.btn} ${s.btnIcon}`}
                          onClick={async () => {
                            if (idx <= 0) return;
                            const next = (() => {
                              const arr = local.slice();
                              const [moved] = arr.splice(idx, 1);
                              if (!moved) return arr;
                              arr.splice(idx - 1, 0, moved);
                              return arr;
                            })();
                            setReordering(true);
                            setLocal(next);
                            const updates = next.map((row, index) => ({ id: row.id, order: index }));
                            await fetch(`/api/partners/reorder`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ updates }),
                            });
                            setReordering(false);
                            await loadAll();
                          }}
                        >
                          <span style={{ opacity: 0.9 }}>↑</span>
                        </button>
                        <button
                          aria-label="Move down"
                          disabled={idx === local.length - 1 || reordering}
                          className={`${s.btn} ${s.btnIcon}`}
                          onClick={async () => {
                            if (idx >= local.length - 1) return;
                            const next = (() => {
                              const arr = local.slice();
                              const [moved] = arr.splice(idx, 1);
                              if (!moved) return arr;
                              arr.splice(idx + 1, 0, moved);
                              return arr;
                            })();
                            setReordering(true);
                            setLocal(next);
                            const updates = next.map((row, index) => ({ id: row.id, order: index }));
                            await fetch(`/api/partners/reorder`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ updates }),
                            });
                            setReordering(false);
                            await loadAll();
                          }}
                        >
                          <span style={{ opacity: 0.9 }}>↓</span>
                        </button>
                        <button onClick={() => startEdit(p)} className={s.btn}>Edit</button>
                        <button onClick={() => void deleteItem(p.id)} className={`${s.btn} ${s.btnDanger}`}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Table cell styles are provided by CSS module classes





