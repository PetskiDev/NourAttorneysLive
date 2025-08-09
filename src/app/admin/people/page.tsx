"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import MediaLibraryModal from "~/components/MediaLibraryModal";
import { z } from "zod";

const PersonSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  role: z.string(),
  imageUrl: z.string().url().nullable().optional(),
  featured: z.boolean(),
  createdAt: z.string(),
});

type Person = z.infer<typeof PersonSchema>;

type EditablePerson = Pick<Person, "name" | "role" | "imageUrl" | "featured">;

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
    featured: false,
  });
  const [showCreateMedia, setShowCreateMedia] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditablePerson | null>(null);
  const isEditing = useMemo(
    () => editingId !== null && editForm !== null,
    [editingId, editForm],
  );

  async function loadPeople() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/people", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const raw = (await res.json()) as unknown;
      const parsed = PeopleArraySchema.parse(raw);
      setPeople(parsed);
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
          featured: Boolean(createForm.featured),
        }),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      setCreateForm({ name: "", role: "", imageUrl: "", featured: false });
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
      featured: person.featured,
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
          featured: Boolean(editForm.featured),
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

  async function toggleFeatured(person: Person) {
    setError(null);
    // optimistic update
    setPeople((prev) =>
      prev.map((p) =>
        p.id === person.id ? { ...p, featured: !p.featured } : p,
      ),
    );
    try {
      const res = await fetch(`/api/people/${person.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !person.featured }),
      });
      if (!res.ok) throw new Error(`Toggle failed: ${res.status}`);
    } catch (e: unknown) {
      // rollback
      setPeople((prev) =>
        prev.map((p) =>
          p.id === person.id ? { ...p, featured: person.featured } : p,
        ),
      );
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

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

      <form
        onSubmit={handleCreate}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.5fr 120px 120px",
          gap: 8,
          alignItems: "end",
          marginBottom: 24,
          maxWidth: 1000,
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
            style={{ width: "100%" }}
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
            style={{ width: "100%" }}
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
              <button type="button" onClick={() => setShowCreateMedia(true)}>Select image</button>
              {createForm.imageUrl ? (
                <button type="button" onClick={() => setCreateForm((f) => ({ ...f, imageUrl: "" }))}>Clear</button>
              ) : null}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            id="featured"
            type="checkbox"
            checked={!!createForm.featured}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, featured: e.target.checked }))
            }
          />
          <label htmlFor="featured">Featured</label>
        </div>
        <div>
          <button type="submit" disabled={creating}>
            {creating ? "Adding..." : "Add Person"}
          </button>
        </div>
      </form>

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
              <th style={th}>Name</th>
              <th style={th}>Role</th>
              <th style={th}>Image</th>
              <th style={th}>Featured</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} style={td}>
                  Loading...
                </td>
              </tr>
            ) : people.length === 0 ? (
              <tr>
                <td colSpan={5} style={td}>
                  No people yet.
                </td>
              </tr>
            ) : (
              people.map((p) => (
                <tr key={p.id}>
                  <td style={td}>
                    {isEditing && editingId === p.id ? (
                      <input
                        value={editForm?.name ?? ""}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, name: e.target.value } : f,
                          )
                        }
                      />
                    ) : (
                      p.name
                    )}
                  </td>
                  <td style={td}>
                    {isEditing && editingId === p.id ? (
                      <input
                        value={editForm?.role ?? ""}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, role: e.target.value } : f,
                          )
                        }
                      />
                    ) : (
                      p.role
                    )}
                  </td>
                  <td style={td}>
                    {isEditing && editingId === p.id ? (
                      <input
                        value={editForm?.imageUrl ?? ""}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, imageUrl: e.target.value } : f,
                          )
                        }
                      />
                    ) : p.imageUrl ? (
                      <a href={p.imageUrl} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    ) : (
                      <span style={{ color: "#666" }}>-</span>
                    )}
                  </td>
                  <td style={td}>
                    {isEditing && editingId === p.id ? (
                      <input
                        type="checkbox"
                        checked={!!editForm?.featured}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, featured: e.target.checked } : f,
                          )
                        }
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={p.featured}
                        onChange={() => void toggleFeatured(p)}
                      />
                    )}
                  </td>
                  <td style={td}>
                    {isEditing && editingId === p.id ? (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => void saveEdit()}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => startEdit(p)}>Edit</button>
                        <button onClick={() => void deletePerson(p.id)}>
                          Delete
                        </button>
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
