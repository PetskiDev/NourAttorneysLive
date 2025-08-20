import styles from "./PartnersList.module.css";
import Link from "next/link";
import { getPartnersListCached } from "~/server/cachedReads";

export const revalidate = false;

export default async function PartnersList() {
  const partners = await getPartnersListCached();
  if (!partners || partners.length === 0) return null;
  return (
    <section className={styles.section}>
      <div className={styles.list}>
        {partners.map((p) => (
          <div key={p.id} className={styles.item}>
            <div className={`${styles.itemTag} descriptor_1`}>PARTNER</div>
            <div className={styles.row}>
              <div className={styles.leftCell}>
                <Link href={`/partners/${p.slug}`} className={styles.nameLink}>
                  <span className={styles.bracketed}>
                    <span className={`${styles.bracketedText} title_3`}>{p.name}</span>
                  </span>
                </Link>
              </div>
              <div className={styles.rightCell}>
                <span className={`${styles.industryLabel} title_2`}>Industry:</span>
                <span className={`${styles.industryText} subtitle_2`}>{p.industry}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Static last item */}
        <div className={styles.item}>
          <div className={styles.itemTag}>PARTNER</div>
          <div className={styles.row}>
            <div className={styles.leftCell}>
              <span className={styles.bracketed}>
                <span className={`${styles.bracketedText} title_3`}>OTHER COMPANIES</span>
              </span>
            </div>
            <div className={styles.rightCell}>
              <span className={styles.industryText}>
                We introduce our client to our their wide network of clients and global partners to
                collaborate with our client to achieve our their desired outcomes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
