import { getInsightsListCached } from "~/server/cachedReads";
import styles from "~/components/InsightsFilterClient.module.css";
import InsightsListClient from "~/components/InsightsListClient";
import { Suspense } from "react";

export const revalidate = false;

export default async function InsightsPage() {
  const insights = await getInsightsListCached();

  return (
    <main className={styles.wrap}>
      <h1> rendered at {new Date().toISOString()}</h1>
      <Suspense fallback={null}>
        <InsightsListClient insights={insights} />
      </Suspense>
    </main>
  );
}


