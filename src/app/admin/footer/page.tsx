"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    void loadLinks();
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
  }

  async function remove(id: number) {
    await fetch(`/api/footer/${id}`, { method: "DELETE" });
    onChanged();
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
    } finally {
      setCreating(false);
    }
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ background: "#fafafa", padding: "10px 12px", fontWeight: 600 }}>{title}</div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Label</th>
            <th style={th}>URL</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {local.length === 0 ? (
            <tr>
              <td colSpan={3} style={td}>No links yet.</td>
            </tr>
          ) : (
            local.map((l, idx) => (
              <tr key={l.id}>
                <td style={td}>
                  {editingId === l.id ? (
                    <input value={editDraft.label} onChange={(e) => setEditDraft((d) => ({ ...d, label: e.target.value }))} />
                  ) : (
                    <span>{l.label}</span>
                  )}
                </td>
                <td style={td}>
                  {editingId === l.id ? (
                    <input value={editDraft.href} onChange={(e) => setEditDraft((d) => ({ ...d, href: e.target.value }))} />
                  ) : (
                    <a href={l.href} target="_blank" rel="noreferrer">{l.href}</a>
                  )}
                </td>
                <td style={td}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      aria-label="Move up"
                      disabled={idx === 0 || reordering}
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
                      ↑
                    </button>
                    <button
                      aria-label="Move down"
                      disabled={idx === local.length - 1 || reordering}
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
                      ↓
                    </button>
                    {editingId === l.id ? (
                      <>
                        <button onClick={() => void saveEdit(l.id)}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(l)}>Edit</button>
                        <button onClick={() => void remove(l.id)}>Delete</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
          {showNew ? (
            <tr>
              <td style={td}>
                <input value={newForm.label} onChange={(e) => setNewForm((f) => ({ ...f, label: e.target.value }))} />
              </td>
              <td style={td}>
                <input value={newForm.href} onChange={(e) => setNewForm((f) => ({ ...f, href: e.target.value }))} />
              </td>
              <td style={td}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => void createNew()} disabled={creating}>{creating ? "Saving..." : "Save"}</button>
                  <button onClick={() => { setShowNew(false); setNewForm({ label: "", href: "" }); }}>Cancel</button>
                </div>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <div style={{ padding: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <button aria-label="Add link" title="Add link" onClick={() => setShowNew(true)}>+</button>
      </div>
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




