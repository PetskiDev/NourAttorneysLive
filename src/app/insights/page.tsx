import { getInsightsListCached } from "~/server/cachedReads";
import InsightCard from "~/components/InsightCard";
import InsightsFilterClient from "~/components/InsightsFilterClient";
import styles from "~/components/InsightsFilterClient.module.css";
import type { Insight } from "@prisma/client";

export const revalidate = false;

type InsightCategory = "ARTICLES" | "NEWS" | "UPDATES" | "PUBLICATIONS";

function filterInsightsByCategories(
  all: Insight[],
  rawCatParam?: string,
) {
  const allCats: ReadonlyArray<InsightCategory> = [
    "ARTICLES",
    "NEWS",
    "UPDATES",
    "PUBLICATIONS",
  ];
  const selectedCats = new Set<InsightCategory>();
  if (rawCatParam) {
    for (const part of rawCatParam.split(",")) {
      const up = part.trim().toUpperCase();
      if ((allCats as ReadonlyArray<string>).includes(up)) {
        selectedCats.add(up as InsightCategory);
      }
    }
  }

  const isAll = selectedCats.size === 0;
  const filtered = isAll
    ? all
    : all.filter((i) => selectedCats.has(i.category as InsightCategory));

  const counts = all.reduce(
    (acc, i) => {
      const cat = i.category as InsightCategory;
      acc.total += 1;
      acc.byCat[cat] += 1;
      return acc;
    },
    {
      total: 0,
      byCat: {
        ARTICLES: 0,
        NEWS: 0,
        UPDATES: 0,
        PUBLICATIONS: 0,
      } as Record<InsightCategory, number>,
    },
  );

  return { filtered, counts } as const;
}

export default async function InsightsPage(
  props: { searchParams: Promise<{ cat?: string }> },
) {
  const insights = await getInsightsListCached();
  const { cat } = await props.searchParams;
  const { filtered, counts } = filterInsightsByCategories(insights, cat);

  return (
    <main className={styles.wrap}>
      <InsightsFilterClient
        totalCount={counts.total}
        categories={[
          { key: "ARTICLES", count: counts.byCat.ARTICLES },
          { key: "NEWS", count: counts.byCat.NEWS },
          { key: "UPDATES", count: counts.byCat.UPDATES },
          { key: "PUBLICATIONS", count: counts.byCat.PUBLICATIONS },
        ]}
      />

      <div className={styles.grid}>
        {filtered.map((i) => (
          <InsightCard
            key={i.id}
            slug={i.slug}
            title={i.title}
            description={i.description}
            category={i.category}
            publishedAt={i.publishedAt}
          />
        ))}
      </div>
    </main>
  );
}


