export const revalidate = false;

import { getExpertiseListCached } from "~/server/cachedReads";
import ExpertiseClient from "../../components/ExpertiseClient";
import styles from "./expertise.module.css";
import Image from "next/image";

export default async function ExpertisePage() {
  const expertise = await getExpertiseListCached();

  return (
    <main>
      <section className={styles.expertiseHero}>
        <div className="containerr">
          <h1 className="headline_1">LEGAL SERVICES</h1>

          <p className="subtitle_2">
            Nour Attorneys specializes in commercial and business law within
            UAE, making it a leading business law firm in the region, renowned
            for its trusted legal services.
          </p>

          <Image
            src={"/expertise-element.svg"}
            alt="element"
            width={530}
            height={530}
          />
        </div>
      </section>

      <section className={styles.expertiseClient}>
        <div className="containerr">
          <ExpertiseClient expertise={expertise} />
        </div>
      </section>
    </main>
  );
}
