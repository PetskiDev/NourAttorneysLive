import { getInsightsListCached } from "~/server/cachedReads";
import styles from "~/components/InsightsFilterClient.module.css";
import InsightsListClient from "~/components/InsightsListClient";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import LatestInsightsServer from "~/components/LatestInsightsServer";

export const revalidate = false;

export default async function InsightsPage() {
  const insights = await getInsightsListCached();

  return (
    <main className={styles.wrap}>
      <section className={styles.insightsHero}>
        <div className="containerr">
          <h1 className="headline_1">INSIGHTS</h1>

          <p className="subtitle_2">
            Where deep legal expertise meets foresight. Explore our insights to
            turn legislative changes into competitive advantages for your
            enterprise
          </p>

          <Image
            src={"/insights-illustration.svg"}
            alt="illustration"
            width={30}
            height={30}
          />
        </div>
      </section>
      <section>
        <div className="containerr" style={{ marginBottom: 32 }}>
          {/* Latest 4 insights - first expanded by default */}
          {/* Exact layout/styling handled in the client module to match design */}
          <LatestInsightsServer />
        </div>
      </section>
      <section>
        <div className="containerr">
          <Suspense fallback={null}>
            <InsightsListClient insights={insights} />
          </Suspense>

          <Link href={"/contact"}>
            <span className="button_link">Load More</span>
            <Image
              src={"/diagonal-arrow.svg"}
              alt="arrow"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
