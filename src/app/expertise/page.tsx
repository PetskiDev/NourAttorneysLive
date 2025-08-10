export const dynamic = "force-dynamic";

import { db } from "~/server/db";
import ExpertiseClient from "../../components/ExpertiseClient";

export default async function ExpertisePage() {
  const expertise = await db.expertise.findMany({
    orderBy: { title: "asc" },
    include: {
      services: {
        orderBy: { title: "asc" },
      },    
    },
  });

  return <ExpertiseClient expertise={expertise} />;
}


