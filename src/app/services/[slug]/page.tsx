import { notFound } from "next/navigation";
import { getServiceBySlugCached } from "~/server/cachedReads";
import { EditableText } from "~/components/EditableText";
import styles from "./servicesSlug.module.css"
import Image from "next/image";

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

      <section className={styles.servicesHero}>

        <div className="containerr">

          <EditableText blockKey="title" relUrl={relUrl} placeholderContent="SERVICES TEMPLATE TITLE" placeholderTag="h1" className="headline_1_3"/>

          <EditableText blockKey="heroDesc" relUrl={relUrl} placeholderContent="At Nour Attorneys, we provide comprehensive courts litigation services, representing your interests before all courts and official bodies. Our dedicated team is committed to helping you reclaim and protect your deserved rights, offering elite, tech-driven litigation services with a deep understanding of applicable laws." placeholderTag="p" className="accent_text_3"/>

          <Image alt="illustration" src={"/service-template-illustration.svg"} />

        </div>

      </section>
      <h1 style={{ marginTop: 0 }}>{service.title}</h1>

      <section style={{ marginTop: 16 }}>
        <EditableText
          relUrl={relUrl}
          blockKey="intro"
        />
      </section>

      <section style={{ marginTop: 24 }}>
        <EditableText
          relUrl={relUrl}
          blockKey="details"
        />
      </section>
    </main>
  );
}
