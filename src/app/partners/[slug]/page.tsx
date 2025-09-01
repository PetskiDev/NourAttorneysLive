import { notFound } from "next/navigation";
import { getPartnerBySlugCached } from "~/server/cachedReads";
import styles from "./partnersSlug.module.css";
import { EditableImage } from "~/components/EditableImage";
import { EditableText } from "~/components/EditableText";

export const revalidate = false;
export const dynamic = "force-static";

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const slug = p.slug;
  const partner = await getPartnerBySlugCached(slug);
  if (!partner) return notFound();
  const relUrl = `/partners/${slug}`;

  return (
    <main>
      <section className={styles.partnerMain}>
        <div className="containerr">
          <div className={styles.partnerOne}>
            <div className={styles.partnerOneLeft}>
              <EditableText
                relUrl={relUrl}
                blockKey="partnerIntroSubtitle"
                placeholderContent="OUR PARTNER"
                placeholderTag="div"
                className="subtitle_4"
              />
            </div>
            <div className={styles.partnerOneRight}>
              <EditableText
                relUrl={relUrl}
                blockKey="partnerIntroTitle"
                placeholderContent="TRANSACTION FOR ME"
                placeholderTag="h1"
                className="headline_1_4"
              />
            </div>
          </div>
          <div className="line"></div>
          <EditableText
            relUrl={relUrl}
            blockKey="partnerIntroSubheadline1"
            placeholderContent="Transaction for Me was founded in 2010 by a"
            placeholderTag="h5"
            className="subheadline_2"
          />
          <EditableText
            relUrl={relUrl}
            blockKey="partnerIntroSubheadline2"
            placeholderContent="team of experts in finance, corporate law, and digital technology. The idea arose in response to the growing complexity of transactions in light of globalization and digital business."
            placeholderTag="h5"
            className="subheadline_2"
          />
          <div className={styles.partnerTwo}>
            <div></div>
            <div>
              <EditableText
                relUrl={relUrl}
                blockKey="partnerLegalHeader"
                placeholderContent="LEGAL PARTNERSHIP"
                placeholderTag="h3"
                className="headline_3"
              />
              <EditableText
                relUrl={relUrl}
                blockKey="partnerLegalParagraph"
                placeholderContent="A key milestone was forming alliances with top-tier legal firms, integrating contract management and compliance checks directly into the transaction process. This innovation reduced average deal completion time by 40% while ensuring full regulatory compliance. The partnerships earned recognition as a pioneer in legal-tech integration within fintech."
                placeholderTag="p"
                className="body_text"
              />
              <EditableText
                relUrl={relUrl}
                blockKey="partnerIndustryHeader"
                placeholderContent="Industry Leadership"
                placeholderTag="h3"
                className="headline_3"
              />
              <EditableText
                relUrl={relUrl}
                blockKey="partnerIndustryParagraph"
                placeholderContent="Today, Transaction for Me maintains 99.98% system uptime while processing transactions in 14 currencies across 38 countries. Its patented &quot;Deal Flow&quot; algorithm has been licensed by three major international banks. The platform&apos;s fraud prevention metrics (0.001% incident rate) remain unmatched in the fintech sector."
                placeholderTag="p"
                className="body_text"
              />
            </div>
          </div>
          <div className={styles.partnerVideo}>
            <video src=""></video>
          </div>
          <div className={styles.partnerThree}>
            <div className={styles.partnerThreeLeft}>
              <div className={styles.partnerThreeLeftTop}>
                <EditableText
                  relUrl={relUrl}
                  blockKey="partnerThreeTopQuote"
                  placeholderContent="Transaction for Me is redefining the industry, making transactions faster, safer, and legally seamless"
                  placeholderTag="h5"
                  className="accent_text_2"
                />
                <ul className="title_2">
                  <EditableText
                    relUrl={relUrl}
                    blockKey="partnerListItem1"
                    placeholderContent="Named a Top 10 FinTech Startup by Forbes"
                    placeholderTag="li"
                    className="title_2"
                  />
                  <EditableText
                    relUrl={relUrl}
                    blockKey="partnerListItem2"
                    placeholderContent="Winner of &quot;Best B2B Solution for Business&quot;"
                    placeholderTag="li"
                    className="title_2"
                  />
                </ul>
              </div>
              <div className={styles.partnerThreeLeftBottom}>
                <EditableImage
                  relUrl={relUrl}
                  placeholderAlt="partner"
                  placeholderUrl={"/partner1.jpg"}
                  blockKey="partnerOne"
                />
              </div>
            </div>
            <div className={styles.partnerThreeRight}>
              <EditableText
                relUrl={relUrl}
                blockKey="partnerStoryParagraph1"
                placeholderContent="Transaction for Me was founded in 2010 with a clear vision to revolutionize how businesses conduct financial transactions. The company began by developing simple digital payment solutions but soon recognized the need for more sophisticated corporate transaction services. Early on, Transaction for Me established strategic partnerships with leading legal firms to integrate professional legal oversight into its technological platform. This unique combination of fintech innovation and legal expertise became the company&apos;s distinguishing feature in the market."
                placeholderTag="p"
                className="body_text"
              />
              <EditableText
                relUrl={relUrl}
                blockKey="partnerStoryParagraph2"
                placeholderContent="The core of Transaction for Me&apos;s service is its proprietary automated transaction platform, which handles everything from initial due diligence to final contract execution. By implementing blockchain technology, the company ensured enhanced security and transparency for all transactions processed through its system. Transaction for Me&apos;s platform also introduced smart contract capabilities, allowing for self-executing agreements under predefined conditions. These technological advancements significantly reduced processing times while minimizing human error and operational costs for clients."
                placeholderTag="p"
                className="body_text"
              />
              <EditableText
                relUrl={relUrl}
                blockKey="partnerStoryParagraph3"
                placeholderContent="Over the years, Transaction for Me expanded its services to cater to both small businesses and large corporations across various industries. The company developed specialized solutions for cross-border transactions, mergers and acquisitions, and high-volume payment processing. Transaction for Me&apos;s ability to adapt to different regulatory environments and business needs contributed to its rapid growth and international expansion. By 2015, the company had established itself as a reliable partner for complex financial operations in multiple jurisdictions."
                placeholderTag="p"
                className="body_text"
              />
              <EditableText
                relUrl={relUrl}
                blockKey="partnerStoryParagraph4"
                placeholderContent="Looking ahead, Transaction for Me plans to further develop its decentralized finance capabilities and expand into new global markets. The company remains focused on its mission to make financial transactions more efficient, secure, and accessible for businesses worldwide. With its strong foundation and forward-thinking strategy, Transaction for Me continues to set new standards in the fintech industry while maintaining its reputation for excellence and reliability. The company&apos;s journey from a startup to an industry leader demonstrates the transformative power of combining technology with professional financial and legal expertise"
                placeholderTag="p"
                className="body_text"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <h1 style={{ marginTop: 0 }}>{partner.name}</h1>
      <div style={{ color: "#777", marginBottom: 16 }}>
        Industry: {partner.industry}
      </div>
      <div style={{ fontSize: 12, color: "#999" }}>
        Slug: <code>{partner.slug}</code>
      </div> */}
    </main>
  );
}
