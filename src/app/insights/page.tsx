import Link from "next/link";
import { getInsightsListCached } from "~/server/cachedReads";
import type { Insight } from "@prisma/client";

export const revalidate = false;

export default async function InsightsPage() {
  const insights = await getInsightsListCached();

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Insights</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {insights.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}

function Card({ item }: { item: Insight }) {
  const href = `/insights/${item.slug}`;
  const { category, title, description, publishedAt } = item;
  return (
    <article style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{category}</div>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ color: "#555" }}>{description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <span style={{ color: "#777", fontSize: 12 }}>{new Date(publishedAt).toLocaleDateString()}</span>
        <Link href={href}>Read more</Link>
      </div>
    </article>
  );
}


