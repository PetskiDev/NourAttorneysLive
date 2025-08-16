"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import s from "../admin.module.css";
import { z } from "zod";

const FooterLinkSchema = z.object({
  id: z.number().int(),
  category: z.enum(["SOCIAL", "NAVIGATION", "CONTACTS"]),
  label: z.string(),
  href: z.string(),
  order: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type FooterLink = z.infer<typeof FooterLinkSchema>;
const FooterArraySchema = z.array(FooterLinkSchema);

const categories: Array<{ key: FooterLink["category"]; title: string }> = [
  { key: "SOCIAL", title: "Social media" },
  { key: "NAVIGATION", title: "Navigation" },
  { key: "CONTACTS", title: "Contacts" },
];

export default function AdminFooterPage() {
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [texts, setTexts] = useState<{ LOCATION?: string; WORKING_HOURS?: string }>({});

  async function loadLinks() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/footer", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const raw = (await res.json()) as unknown;
      setLinks(FooterArraySchema.parse(raw));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadTexts() {
    try {
      const res = await fetch("/api/footer/text", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const raw = (await res.json()) as unknown as { LOCATION?: string; WORKING_HOURS?: string };
      setTexts(raw || {});
    } catch {
      // ignore for now
    }
  }

  useEffect(() => {
    void loadLinks();
    void loadTexts();
  }, []);

  const byCategory = useMemo(() => {
    const grouped: Record<FooterLink["category"], FooterLink[]> = {
      SOCIAL: [],
      NAVIGATION: [],
      CONTACTS: [],
    };
    for (const l of links) grouped[l.category].push(l);
    for (const key of Object.keys(grouped) as Array<keyof typeof grouped>) {
      grouped[key].sort((a, b) => a.order - b.order || a.id - b.id);
    }
    return grouped;
  }, [links]);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0, marginBottom: 16 }}>Admin · Footer</h1>
      <p style={{ color: "#666", marginTop: 0, marginBottom: 24 }}>
        Manage footer categories and their ordered links. Use the arrows to change order and click Save to persist.
      </p>

      {error && (
        <div style={{ marginBottom: 16, color: "#b00020" }} role="alert">
          {error}
        </div>
      )}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextsPanel texts={texts} onChanged={() => void loadTexts()} />
          {categories.map((c) => (
            <CategoryPanel
              key={c.key}
              category={c.key}
              title={c.title}
              links={byCategory[c.key]}
              onChanged={() => void loadLinks()}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TextsPanel({ texts, onChanged }: { texts: { LOCATION?: string; WORKING_HOURS?: string }; onChanged: () => void }) {
  const [form, setForm] = useState<{ LOCATION: string; WORKING_HOURS: string }>(() => ({ LOCATION: texts.LOCATION ?? "", WORKING_HOURS: texts.WORKING_HOURS ?? "" }));
  useEffect(() => setForm({ LOCATION: texts.LOCATION ?? "", WORKING_HOURS: texts.WORKING_HOURS ?? "" }), [texts]);
  async function save(key: "LOCATION" | "WORKING_HOURS") {
    await fetch("/api/footer/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: form[key] }),
    });
    onChanged();
    if (typeof window !== "undefined") window.location.reload();
  }
  return (
    <div className={s.card}>
      <div className={s.cardHeader}>Footer texts</div>
      <div style={{ padding: 12, display: "grid", gap: 12, gridTemplateColumns: "1fr 160px" }}>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 600 }}>Location</label>
          <textarea value={form.LOCATION} onChange={(e) => setForm((f) => ({ ...f, LOCATION: e.target.value }))} rows={3} className={s.input} />
        </div>
        <div style={{ display: "flex", alignItems: "end" }}>
          <button onClick={() => void save("LOCATION")} className={`${s.btn} ${s.btnPrimary}`}>Save</button>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 600 }}>Working hours</label>
          <input value={form.WORKING_HOURS} onChange={(e) => setForm((f) => ({ ...f, WORKING_HOURS: e.target.value }))} className={s.input} />
        </div>
        <div style={{ display: "flex", alignItems: "end" }}>
          <button onClick={() => void save("WORKING_HOURS")} className={`${s.btn} ${s.btnPrimary}`}>Save</button>
        </div>
      </div>
    </div>
  );
}


function CategoryPanel({ category, title, links, onChanged }: { category: FooterLink["category"]; title: string; links: FooterLink[]; onChanged: () => void }) {
  const [local, setLocal] = useState<FooterLink[]>(links);
  useEffect(() => setLocal(links), [links]);

  const [showNew, setShowNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState({ label: "", href: "" });
  const [reordering, setReordering] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<{ label: string; href: string }>({ label: "", href: "" });

  function startEdit(link: FooterLink) {
    setEditingId(link.id);
    setEditDraft({ label: link.label, href: link.href });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft({ label: "", href: "" });
  }

  async function saveEdit(id: number) {
    await fetch(`/api/footer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: editDraft.label.trim(), href: editDraft.href.trim() }),
    });
    cancelEdit();
    onChanged();
    if (typeof window !== "undefined") window.location.reload();
  }

  async function remove(id: number) {
    await fetch(`/api/footer/${id}`, { method: "DELETE" });
    onChanged();
    if (typeof window !== "undefined") window.location.reload();
  }

  // order saving now done by the panel-level Save button

  async function createNew() {
    setCreating(true);
    try {
      const nextOrder = local.length;
      const res = await fetch(`/api/footer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, label: newForm.label.trim(), href: newForm.href.trim(), order: nextOrder }),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      setShowNew(false);
      setNewForm({ label: "", href: "" });
      onChanged();
      if (typeof window !== "undefined") window.location.reload();
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className={s.card}>
      <div className={s.cardHeader}>{title}</div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th className={s.th}>Label</th>
            <th className={s.th}>URL</th>
            <th className={s.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {local.length === 0 ? (
            <tr>
              <td colSpan={3} className={s.td}>No links yet.</td>
            </tr>
          ) : (
            local.map((l, idx) => (
              <tr key={l.id}>
                <td className={s.td}>
                  {editingId === l.id ? (
                    <input value={editDraft.label} onChange={(e) => setEditDraft((d) => ({ ...d, label: e.target.value }))} className={s.inputSmall} />
                  ) : (
                    <span>{l.label}</span>
                  )}
                </td>
                <td className={s.td}>
                  {editingId === l.id ? (
                    <input value={editDraft.href} onChange={(e) => setEditDraft((d) => ({ ...d, href: e.target.value }))} className={s.inputSmall} />
                  ) : (
                    <a href={l.href} target="_blank" rel="noreferrer">{l.href}</a>
                  )}
                </td>
                <td className={s.td}>
                  <div style={{ display: "flex", gap: 8 }}>
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
                        await fetch(`/api/footer/reorder`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ updates }),
                        });
                        setReordering(false);
                        onChanged();
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
                        await fetch(`/api/footer/reorder`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ updates }),
                        });
                        setReordering(false);
                        onChanged();
                      }}
                    >
                      <span style={{ opacity: 0.9 }}>↓</span>
                    </button>
                    {editingId === l.id ? (
                      <>
                        <button onClick={() => void saveEdit(l.id)} className={`${s.btn} ${s.btnPrimary}`}>Save</button>
                        <button onClick={cancelEdit} className={s.btn}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(l)} className={s.btn}>Edit</button>
                        <button onClick={() => void remove(l.id)} className={`${s.btn} ${s.btnDanger}`}>Delete</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
          {showNew ? (
            <tr>
              <td className={s.td}>
                <input value={newForm.label} onChange={(e) => setNewForm((f) => ({ ...f, label: e.target.value }))} className={s.inputSmall} />
              </td>
              <td className={s.td}>
                <input value={newForm.href} onChange={(e) => setNewForm((f) => ({ ...f, href: e.target.value }))} className={s.inputSmall} />
              </td>
              <td className={s.td}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => void createNew()} disabled={creating} className={`${s.btn} ${s.btnPrimary}`}>{creating ? "Saving..." : "Save"}</button>
                  <button onClick={() => { setShowNew(false); setNewForm({ label: "", href: "" }); }} className={s.btn}>Cancel</button>
                </div>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <div style={{ padding: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <button aria-label="Add link" title="Add link" onClick={() => setShowNew(true)} className={s.btn}>+ Add link</button>
      </div>
    </div>
  );
}

// Visual styles are imported from ../admin.module.css




