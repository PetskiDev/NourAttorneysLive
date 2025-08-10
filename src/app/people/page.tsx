import EditablePersonImage from "~/components/EditablePersonImage";
import { db } from "~/server/db";

export const dynamic = "force-static";

export default async function PeoplePage() {
  const people = await db.people.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main style={{ padding: 24, height: 2000 }}>
      <h1 style={{ marginTop: 0 }}>People</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {people.map((p) => (
          <article key={p.id} style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ width: "100%", height: 180, position: "relative" }}>
              <EditablePersonImage personId={p.id} initialUrl={p.imageUrl ?? null} isAdmin={true} alt={p.name} />
            </div>
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ color: "#666" }}>{p.role}</div>
            </div>
          </article>
        ))}
      </div>
      
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
      <h1>uwau</h1>
    </main>
  );
}


