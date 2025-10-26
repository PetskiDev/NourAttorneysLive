"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import s from "../admin.module.css";
import MediaLibraryModal from "~/components/MediaLibraryModal";
import type { InsightResponseDTO } from "~/lib/validators";
// import { insightArraySchema } from "~/lib/validators";


type Insight = InsightResponseDTO;
type EditableInsight = Pick<
  Insight,
  "slug" | "title" | "description" | "category" | "publisher" | "imageUrl" | "publishedAt"
>;


const categories: EditableInsight["category"][] = [
  "ARTICLES",
  "NEWS",
  "UPDATES",
  "PUBLICATIONS",
];

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  type BuilderMode = "create" | "edit";
  const [builderOpen, setBuilderOpen] = useState<boolean>(false);
  const [builderMode, setBuilderMode] = useState<BuilderMode>("create");
  const [builderId, setBuilderId] = useState<number | null>(null);
  const [form, setForm] = useState<EditableInsight>({
    slug: "",
    title: "",
    description: "",
    category: "ARTICLES",
    publisher: "",
    imageUrl: "",
    publishedAt: new Date().toISOString(),
  });
  const [showMedia, setShowMedia] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function loadInsights() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/insights", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const raw = (await res.json()) as Insight[];
      setInsights(raw);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadInsights();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(
        builderMode === "create" ? "/api/insights" : `/api/insights/${builderId}`,
        {
          method: builderMode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setForm({
        slug: "",
        title: "",
        description: "",
        category: "ARTICLES",
        publisher: "",
        imageUrl: "",
        publishedAt: new Date().toISOString(),
      });
      setBuilderOpen(false);
      await loadInsights();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  function openCreate() {
    setBuilderMode("create");
    setBuilderId(null);
    setForm({
      slug: "",
      title: "",
      description: "",
      category: "ARTICLES",
      publisher: "",
      imageUrl: "",
      publishedAt: new Date().toISOString(),
    });
    setBuilderOpen(true);
  }

  function openEdit(i: Insight) {
    setBuilderMode("edit");
    setBuilderId(i.id);
    setForm({
      slug: i.slug,
      title: i.title,
      description: i.description,
      category: i.category,
      publisher: i.publisher,
      imageUrl: i.imageUrl ?? "",
      publishedAt: i.publishedAt,
    });
    setBuilderOpen(true);
  }

  async function deleteInsight(id: number) {
    try {
      if (!window.confirm("Delete this insight? This cannot be undone.")) return;
      const res = await fetch(`/api/insights/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      await loadInsights();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    }
  }

  const [rowMediaFor, setRowMediaFor] = useState<number | null>(null);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Admin · Insights</h1>
        <div style={{ display: "flex", gap: 8 }}>
          {builderOpen && (
            <button type="button" onClick={() => setBuilderOpen(false)} className={s.btn}>Close</button>
          )}
          <button onClick={() => openCreate()} className={`${s.btn} ${s.btnPrimary}`}>New</button>
        </div>
      </div>
      <p style={{ color: "#666", marginTop: 0, marginBottom: 24 }}>
        Create and manage insights. This page is dynamic and client-rendered.
      </p>

      {error && (
        <div style={{ marginBottom: 16, color: "#b00020" }} role="alert">
          {error}
        </div>
      )}

      {builderOpen && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <div
            style={{
              border: "12px solid #000",
              borderRadius: 6,
              overflow: "hidden",
              maxWidth: 1100,
              marginTop: 8,
              background: "#fff",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", minHeight: 420 }}>
              {/* Left: content */}
              <div style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, category: e.target.value as EditableInsight["category"] }))
                      }
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 700,
                        letterSpacing: 0.3,
                        border: "2px solid #2F6BFF",
                        color: "#2F6BFF",
                        background: "transparent",
                        padding: "6px 12px",
                        borderRadius: 6,
                      }}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    required
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      fontSize: 28,
                      fontWeight: 800,
                      marginBottom: 12,
                    }}
                  />

                  <textarea
                    placeholder="Short description"
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    required
                    rows={7}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      fontSize: 18,
                      lineHeight: 1.6,
                      color: "#222",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div style={{ color: "#222", fontSize: 14 }}>
                  <span>By </span>
                  <input
                    placeholder="Publisher"
                    value={form.publisher}
                    onChange={(e) => setForm((f) => ({ ...f, publisher: e.target.value }))}
                    style={{ border: "none", outline: "none", fontWeight: 700 }}
                  />
                  <span style={{ margin: "0 8px", color: "#777" }}>/</span>
                  <input
                    type="date"
                    value={new Date(form.publishedAt).toISOString().slice(0, 10)}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, publishedAt: new Date(e.target.value).toISOString() }))
                    }
                    style={{ border: "none", outline: "none", color: "#555" }}
                  />
                </div>
              </div>

              {/* Right: image */}
              <div style={{ position: "relative", background: "#f6f7f9" }}>
                {form.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.imageUrl}
                    alt={form.title || "Insight image"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "#999" }}>
                    No image selected
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowMedia(true)}
                  className={s.btn}
                  style={{ position: "absolute", right: 12, bottom: 12 }}
                >
                  Choose image…
                </button>
              </div>
            </div>
          </div>

          {/* Slug + submit */}
          <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ color: "#666" }}>/insights/</span>
              <input
                placeholder="slug"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                required
                className={s.input}
                disabled={builderMode === "edit"}
                title={builderMode === "edit" ? "Slug cannot be changed after creation" : undefined}
              />
            </div>
            <button type="submit" disabled={submitting} className={`${s.btn} ${s.btnPrimary}`}>
              {submitting ? "Saving…" : builderMode === "create" ? "Create insight" : "Save changes"}
            </button>
            {builderMode === "edit" && (
              <button type="button" onClick={() => setBuilderOpen(false)} className={s.btn}>Cancel</button>
            )}
          </div>
        </form>
      )}

      <MediaLibraryModal
        open={showMedia}
        onClose={() => setShowMedia(false)}
        onSelect={(url) => {
          setForm((f) => ({ ...f, imageUrl: url }));
          setShowMedia(false);
        }}
      />

      <div style={{ overflowX: "auto" }}>
        <div className={s.tableWrap}>
        <table className={s.table} style={{ minWidth: 1000 }}>
          <thead>
            <tr>
              <th className={s.th}>ID</th>
              <th className={s.th}>Category</th>
              <th className={s.th}>Slug</th>
              <th className={s.th}>Title</th>
              <th className={s.th}>Publisher</th>
              <th className={s.th}>Image</th>
              <th className={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className={s.td} colSpan={7}>
                  Loading…
                </td>
              </tr>
            ) : insights.length === 0 ? (
              <tr>
                <td className={s.td} colSpan={7}>
                  No insights yet
                </td>
              </tr>
            ) : (
              insights.map((i) => (
                <tr key={i.id}>
                  <td className={s.td}>{i.id}</td>
                  <td className={s.td}>
                    {i.category}
                  </td>
                  <td className={s.td}>
                    {i.slug}
                  </td>
                  <td className={s.td}>
                    {i.title}
                  </td>
                  <td className={s.td}>
                    {i.publisher}
                  </td>
                  <td className={s.td}>
                    {i.imageUrl ? (
                      <a href={i.imageUrl} target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : (
                      <span style={{ color: "#999" }}>None</span>
                    )}
                  </td>
                  <td className={s.td}>
                    <div style={{ display: "flex", gap: 8 }}>
                        <Link href={`/insights/${i.slug}`}>
                          <button type="button" className={s.btn}>View</button>
                        </Link>
                        <button onClick={() => openEdit(i)} className={s.btn}>Edit</button>
                        <button onClick={() => void deleteInsight(i.id)} className={`${s.btn} ${s.btnDanger}`}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Row image chooser modal */}
      <MediaLibraryModal
        open={rowMediaFor !== null}
        onClose={() => setRowMediaFor(null)}
        onSelect={(url) => {
          // When using the row picker, we simply copy into builder form
          setForm((f) => ({ ...f, imageUrl: url }));
          setRowMediaFor(null);
        }}
      />
    </div>
  );
}

// Table cell styles provided via CSS module classes



