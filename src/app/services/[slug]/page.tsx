import { notFound } from "next/navigation";
import { getServiceBySlugCached } from "~/server/cachedReads";
import { EditableText } from "~/components/EditableText";
import styles from "./servicesSlug.module.css";
import Image from "next/image";
import { EditableImage } from "~/components/EditableImage";
import Link from "next/link";
import LatestInsightsServer from "~/components/LatestInsightsServer";

export const revalidate = false;
export const dynamic = "force-static";


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
    <main>
      <section className={styles.servicesHero}>
        <div className="containerr">
          <EditableText
            blockKey="title"
            relUrl={relUrl}
            placeholderContent="SERVICES TEMPLATE TITLE"
            placeholderTag="h1"
            className="headline_1_3"
          />

          <EditableText
            blockKey="heroDesc"
            relUrl={relUrl}
            placeholderContent="At Nour Attorneys, we provide comprehensive courts litigation services, representing your interests before all courts and official bodies. Our dedicated team is committed to helping you reclaim and protect your deserved rights, offering elite, tech-driven litigation services with a deep understanding of applicable laws."
            placeholderTag="p"
            className="accent_text_3"
          />

          <Image
          width={30}
          height={30}
            alt="illustration"
            src={"/service-template-illustration.svg"}
          />
        </div>
      </section>

      <section className={styles.servicesTemplateMain}>

        <div className="containerr">

          <div className={styles.servicesRow}>

            <div className={styles.servicesRowLeft}>
              <EditableText relUrl={relUrl} placeholderContent="Your Trusted Partner in Judicial Proceedings" placeholderTag="p" className="subtitle_4 antiselector" blockKey="leftText"/>
            </div>

            <div className={styles.servicesRowRight}>
              <EditableText relUrl={relUrl} placeholderContent="Expert Navigation of Legal Disputes and Court Procedures" placeholderTag="h3" className="headline_3 antiselector" blockKey="rightH1"/>
              <EditableText relUrl={relUrl} placeholderContent="We stand ready to represent you before all courts and official bodies, dedicated to helping you reclaim and protect your deserved rights. Our team is well-versed in all litigation procedures and possesses a deep understanding of the laws that judges will apply to resolve the dispute, providing elite, tech-driven litigation services for civil, commercial, labor, or criminal cases." placeholderTag="p" className="body_text antiselector" blockKey="rightP1"/>
            </div>

          </div>

          <div className={styles.servicesRow}>

            <div className={styles.servicesRowLeft}>
            </div>

            <div className={styles.servicesRowRight}>
              <EditableText relUrl={relUrl} placeholderContent="Expert Navigation of Legal Disputes and Court Procedures" placeholderTag="h3" className="headline_3 antiselector" blockKey="rightH2"/>
              <EditableText relUrl={relUrl} placeholderContent="We stand ready to represent you before all courts and official bodies, dedicated to helping you reclaim and protect your deserved rights. Our team is well-versed in all litigation procedures and possesses a deep understanding of the laws that judges will apply to resolve the dispute, providing elite, tech-driven litigation services for civil, commercial, labor, or criminal cases." placeholderTag="p" className="body_text antiselector" blockKey="rightP2"/>
            </div>

          </div>

          <div className={styles.servicesRow}>

            <div className={styles.servicesRowLeft}>
            </div>

            <div className={styles.servicesRowRight}>
              <EditableText relUrl={relUrl} placeholderContent="Expert Navigation of Legal Disputes and Court Procedures" placeholderTag="h3" className="headline_3 antiselector" blockKey="rightH3"/>
              <EditableText relUrl={relUrl} placeholderContent="We stand ready to represent you before all courts and official bodies, dedicated to helping you reclaim and protect your deserved rights. Our team is well-versed in all litigation procedures and possesses a deep understanding of the laws that judges will apply to resolve the dispute, providing elite, tech-driven litigation services for civil, commercial, labor, or criminal cases." placeholderTag="p" className="body_text antiselector" blockKey="rightP3"/>
            </div>

          </div>

          <div className={styles.servicesRow}>

            <div className={styles.servicesRowLeft}>
              <EditableImage relUrl={relUrl} blockKey="leftImage" placeholderAlt="left-image" placeholderUrl="/service-template-placeholder-1.jpg"/>
            </div>

            <div className={styles.servicesRowRight}>
              <EditableImage relUrl={relUrl} blockKey="rightImage" placeholderAlt="left-image" placeholderUrl="/service-template-placeholder-2.jpg"/>
            </div>

          </div>

          <div className={styles.servicesRow}>

            <div className={styles.servicesRowLeft}>
            </div>

            <div className={styles.servicesRowRight}>
              <EditableText relUrl={relUrl} placeholderContent="Expert Navigation of Legal Disputes and Court Procedures" placeholderTag="h3" className="headline_3 antiselector" blockKey="rightH4"/>
              <EditableText relUrl={relUrl} placeholderContent="We stand ready to represent you before all courts and official bodies, dedicated to helping you reclaim and protect your deserved rights. Our team is well-versed in all litigation procedures and possesses a deep understanding of the laws that judges will apply to resolve the dispute, providing elite, tech-driven litigation services for civil, commercial, labor, or criminal cases." placeholderTag="p" className="body_text antiselector" blockKey="rightP4"/>
            </div>

          </div>

          <div className={styles.servicesRow}>

            <div className={styles.servicesRowLeft}>
            </div>

            <div className={styles.servicesRowRight}>
              <EditableText relUrl={relUrl} placeholderContent="Expert Navigation of Legal Disputes and Court Procedures" placeholderTag="h3" className="headline_3 antiselector" blockKey="rightH5"/>
              <EditableText relUrl={relUrl} placeholderContent="We stand ready to represent you before all courts and official bodies, dedicated to helping you reclaim and protect your deserved rights. Our team is well-versed in all litigation procedures and possesses a deep understanding of the laws that judges will apply to resolve the dispute, providing elite, tech-driven litigation services for civil, commercial, labor, or criminal cases." placeholderTag="p" className="body_text antiselector" blockKey="rightP5"/>
            </div>

          </div>

          <div className={styles.servicesRow}>

            <div className={styles.servicesRowLeft}>
            </div>

            <div className={styles.servicesRowRight}>
              <EditableText relUrl={relUrl} placeholderContent="Expert Navigation of Legal Disputes and Court Procedures" placeholderTag="h3" className="headline_3 antiselector" blockKey="rightH6"/>
              <EditableText relUrl={relUrl} placeholderContent="We stand ready to represent you before all courts and official bodies, dedicated to helping you reclaim and protect your deserved rights. Our team is well-versed in all litigation procedures and possesses a deep understanding of the laws that judges will apply to resolve the dispute, providing elite, tech-driven litigation services for civil, commercial, labor, or criminal cases." placeholderTag="p" className="body_text antiselector" blockKey="rightP6"/>
            </div>

          </div>

          <div className={styles.servicesRow}>

            <div className={styles.servicesRowLeft}>
            </div>

            <div className={styles.servicesRowRight}>
              <Link href={"/contact"}>
                <span className="button_link">Contact Us</span>
                <Image src={"/diagonal-arrow.svg"} alt="arrow" width={30} height={30}/>
              </Link>
            </div>

          </div>

        </div>

      </section>

      <section className={styles.insights}>
        <div className="containerr">
          <h2 className="subheadline_2">Explore our <span className="blue-text">related insights/articles</span> that explain more about our process</h2>
          <LatestInsightsServer />
        </div>
      </section>
    </main>
  );
}
