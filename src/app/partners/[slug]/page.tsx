import { notFound } from "next/navigation";
import { getPartnerBySlugCached } from "~/server/cachedReads";

export const revalidate = false;

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const slug = p.slug;
  const partner = await getPartnerBySlugCached(slug);
  if (!partner) return notFound();

  return (
    <main style={{ padding: 24 }}>
      <small> rendered At: {new Date().toISOString()}</small>
      <h1 style={{ marginTop: 0 }}>{partner.name}</h1>
      <div style={{ color: "#777", marginBottom: 16 }}>
        Industry: {partner.industry}
      </div>
      <div style={{ fontSize: 12, color: "#999" }}>
        Slug: <code>{partner.slug}</code>
      </div>
    </main>
  );
}
