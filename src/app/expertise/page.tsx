export const revalidate = false;

import { getExpertiseListCached } from "~/server/cachedReads";
import ExpertiseClient from "../../components/ExpertiseClient";

export default async function ExpertisePage() {
  const expertise = await getExpertiseListCached();

  return <ExpertiseClient expertise={expertise} />;
}


