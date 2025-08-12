import { notFound } from "next/navigation";
import Image from "next/image";
import { getInsightBySlugCached } from "~/server/cachedReads";

export const revalidate = false;

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const slug = p.slug;
  const insight = await getInsightBySlugCached(slug);
  if (!insight) return notFound();

  return (
    <main style={{ padding: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{insight.category}</div>
      <h1 style={{ marginTop: 0 }}>{insight.title}</h1>
      <div style={{ color: "#777", marginBottom: 16 }}>
        By {insight.publisher} · {new Date(insight.publishedAt).toLocaleDateString()}
      </div>
      {insight.imageUrl && (
        <div style={{ position: "relative", width: "100%", maxWidth: 800, aspectRatio: "16/9", marginBottom: 16 }}>
          <Image src={insight.imageUrl} alt={insight.title} fill style={{ objectFit: "cover", borderRadius: 8 }} />
        </div>
      )}
      <p style={{ fontSize: 18, lineHeight: 1.6 }}>{insight.description}</p>
    </main>
  );
}


