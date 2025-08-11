import { notFound } from "next/navigation";
import { getServiceBySlugCached } from "~/server/cachedReads";
import { EditableText } from "~/components/EditableText";

export const revalidate = false;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const slug = p.slug;

  const service = await getServiceBySlugCached(slug);
  if (!service) return notFound();

  const relUrl = `/services/${slug}`;

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
        />
      </section>

      <section style={{ marginTop: 24 }}>
        <EditableText
          relUrl={relUrl}
          blockKey="details"
          isAdmin={true}
        />
      </section>
    </main>
  );
}
