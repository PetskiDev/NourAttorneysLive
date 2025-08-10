import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { getBlocksForPage } from "~/server/blocks";
import { EditableText } from "~/components/EditableText";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const services = await db.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const slug = p.slug;

  const service = await db.service.findUnique({ where: { slug } });
  if (!service) return notFound();

  const relUrl = `/services/${slug}`;
  const blocks = await getBlocksForPage(relUrl);

//TIPS CODE GOES HERE
//USE EDITABLEBLOCKS WITH relurl and blocks

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>{service.title}</h1>

      <section style={{ marginTop: 16 }}>
        <EditableText
          relUrl={relUrl}
          blockKey="intro"
          isAdmin={true}
          initialContent={blocks["intro"]?.content}
          initialTag={blocks["intro"]?.elementTag ?? "p"}
        />
      </section>

      <section style={{ marginTop: 24 }}>
        <EditableText
          relUrl={relUrl}
          blockKey="details"
          isAdmin={true}
          initialContent={blocks["details"]?.content}
          initialTag={blocks["details"]?.elementTag ?? "p"}
        />
      </section>
    </main>
  );
}
