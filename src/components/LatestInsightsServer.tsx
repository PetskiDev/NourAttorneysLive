import { getLatestInsightsCached } from "~/server/cachedReads";
import LatestInsightsClient from "~/components/LatestInsightsClient";

export default async function LatestInsightsServer() {
  const insights = await getLatestInsightsCached();
  if (!insights || insights.length === 0) return null;
  return <LatestInsightsClient insights={insights} />;
}


