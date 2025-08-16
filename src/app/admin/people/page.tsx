"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import MediaLibraryModal from "~/components/MediaLibraryModal";
import s from "../admin.module.css";
import { z } from "zod";

const PersonSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  role: z.string(),
  imageUrl: z.string().url().nullable().optional(),
  order: z.number().int().optional().default(0),
  createdAt: z.string(),
});

type Person = z.infer<typeof PersonSchema>;

type EditablePerson = Pick<Person, "name" | "role" | "imageUrl">;

const PeopleArraySchema = z.array(PersonSchema);

export default function AdminPeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [creating, setCreating] = useState<boolean>(false);
  const [createForm, setCreateForm] = useState<EditablePerson>({
    name: "",
    role: "",
    imageUrl: "",
  });
  const [showCreateMedia, setShowCreateMedia] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditablePerson | null>(null);
  const [local, setLocal] = useState<Person[]>([]);
  const [reordering, setReordering] = useState(false);
  const isEditing = useMemo(
    () => editingId !== null && editForm !== null,
    [editingId, editForm],
  );

  // Visual styles shared via CSS module classes in ../admin.module.css

  async function loadPeople() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/people", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const raw = (await res.json()) as unknown;
      const parsed = PeopleArraySchema.parse(raw);
      setPeople(parsed);
      setLocal(parsed);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadPeople();
  }, []);

  useEffect(() => {
    setLocal(people);
  }, [people]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const imageUrlValue = (createForm.imageUrl ?? "").toString().trim();
      const res = await fetch("/api/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: createForm.name.trim(),
          role: createForm.role.trim(),
          imageUrl: imageUrlValue === "" ? undefined : imageUrlValue,
        }),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      setCreateForm({ name: "", role: "", imageUrl: "" });
      setShowCreateMedia(false);
      await loadPeople();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setCreating(false);
    }
  }

  function startEdit(person: Person) {
    setEditingId(person.id);
    setEditForm({
      name: person.name,
      role: person.role,
      imageUrl: person.imageUrl ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }

  async function saveEdit() {
    if (!isEditing || editingId === null || editForm === null) return;
    setError(null);
    try {
      const editImageValue = (editForm.imageUrl ?? "").toString().trim();
      const res = await fetch(`/api/people/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name.trim(),
          role: editForm.role.trim(),
          imageUrl: editImageValue === "" ? null : editImageValue,
        }),
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      cancelEdit();
      await loadPeople();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

  async function deletePerson(id: number) {
    setError(null);
    try {
      const res = await fetch(`/api/people/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      await loadPeople();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

  // Reorder helpers

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0, marginBottom: 16 }}>Admin · People</h1>
      <p style={{ color: "#666", marginTop: 0, marginBottom: 24 }}>
        Manage people entries. This page is dynamic and client-rendered.
      </p>

      {error && (
        <div style={{ marginBottom: 16, color: "#b00020" }} role="alert">
          {error}
        </div>
      )}

      <div className={s.card}>
        <div className={s.cardHeader}>Add person</div>
        <form
        onSubmit={handleCreate}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.5fr 120px 120px",
          gap: 8,
          alignItems: "end",
          padding: 12,
          maxWidth: 1100,
        }}
      >
        <div>
          <label htmlFor="name" style={{ display: "block", fontWeight: 600 }}>
            Name
          </label>
          <input
            id="name"
            required
            value={createForm.name}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, name: e.target.value }))
            }
            className={s.input}
          />
        </div>
        <div>
          <label htmlFor="role" style={{ display: "block", fontWeight: 600 }}>
            Role
          </label>
          <input
            id="role"
            required
            value={createForm.role}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, role: e.target.value }))
            }
            className={s.input}
          />
        </div>
        <div>
          <label htmlFor="imageUrl" style={{ display: "block", fontWeight: 600 }}>
            Image
          </label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 120, height: 60, position: "relative", border: "1px solid #ddd", borderRadius: 6, overflow: "hidden", background: "#fafafa" }}>
              {createForm.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={createForm.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: 12 }}>No image</div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={() => setShowCreateMedia(true)} className={`${s.btn} ${s.btnSubtle}`}>Choose image…</button>
              {createForm.imageUrl ? (
                <button type="button" onClick={() => setCreateForm((f) => ({ ...f, imageUrl: "" }))} className={s.btn}>Clear</button>
              ) : null}
            </div>
          </div>
        </div>
        
        <div>
          <button type="submit" disabled={creating} className={`${s.btn} ${s.btnPrimary}`}>
            {creating ? "Adding..." : "Add Person"}
          </button>
        </div>
      </form>
      </div>

      <MediaLibraryModal
        open={showCreateMedia}
        onClose={() => setShowCreateMedia(false)}
        onSelect={(url) => {
          setCreateForm((f) => ({ ...f, imageUrl: url }));
          setShowCreateMedia(false);
        }}
      />

      <div style={{ overflowX: "auto" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", maxWidth: 1000 }}
        >
          <thead>
            <tr>
              <th className={s.th}>Name</th>
              <th className={s.th}>Role</th>
              <th className={s.th}>Image</th>
              <th className={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className={s.td}>
                  Loading...
                </td>
              </tr>
            ) : local.length === 0 ? (
              <tr>
                <td colSpan={4} className={s.td}>
                  No people yet.
                </td>
              </tr>
            ) : (
              local.map((p, idx) => (
                <tr key={p.id}>
                  <td className={s.td}>
                    {isEditing && editingId === p.id ? (
                      <input
                        value={editForm?.name ?? ""}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, name: e.target.value } : f,
                          )
                        }
                        className={s.inputSmall}
                      />
                    ) : (
                      p.name
                    )}
                  </td>
                  <td className={s.td}>
                    {isEditing && editingId === p.id ? (
                      <input
                        value={editForm?.role ?? ""}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, role: e.target.value } : f,
                          )
                        }
                        className={s.inputSmall}
                      />
                    ) : (
                      p.role
                    )}
                  </td>
                  <td className={s.td}>
                    {isEditing && editingId === p.id ? (
                      <input
                        value={editForm?.imageUrl ?? ""}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, imageUrl: e.target.value } : f,
                          )
                        }
                        className={s.inputSmall}
                      />
                    ) : p.imageUrl ? (
                      <a href={p.imageUrl} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    ) : (
                      <span style={{ color: "#666" }}>-</span>
                    )}
                  </td>
                  <td className={s.td}>
                    {isEditing && editingId === p.id ? (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => void saveEdit()} className={`${s.btn} ${s.btnPrimary}`}>Save</button>
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
                            await fetch(`/api/people/reorder`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ updates }),
                            });
                            setReordering(false);
                            await loadPeople();
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
                            await fetch(`/api/people/reorder`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ updates }),
                            });
                            setReordering(false);
                            await loadPeople();
                          }}
                        >
                          <span style={{ opacity: 0.9 }}>↓</span>
                        </button>
                        <button onClick={() => startEdit(p)} className={s.btn}>Edit</button>
                        <button onClick={() => void deletePerson(p.id)} className={`${s.btn} ${s.btnDanger}`}>Delete</button>
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
