import { unstable_cache } from "next/cache";
import { db } from "./db";
import { tag } from "./cacheTags";
import type { Insight } from "@prisma/client";

export const getPeopleCached = unstable_cache(
  async () => {
    return db.people.findMany({ orderBy: { createdAt: "desc" } });
  },
  ["getPeopleCached"],
  {
    tags: [tag.peopleList()],
  }
);

export const getExpertiseListCached = unstable_cache(
  async () => {
    return db.expertise.findMany({ orderBy: { createdAt: "desc" }, include: { services: true } });
  },
  ["getExpertiseListCached"],
  {
    tags: [tag.expertiseList(), tag.serviceList()],
  }
);

export function getServiceBySlugCached(slug: string) {
  const cached = unstable_cache(
    async () => {
      return db.service.findUnique({ where: { slug } });
    },
    ["getServiceBySlugCached", slug],
    { tags: [tag.serviceSlug(slug), tag.serviceList()] }
  );
  return cached();
}

export function getServicesForExpertiseCached(expertiseId: number) {
  const cached = unstable_cache(
    async () => {
      return db.service.findMany({ where: { expertiseId }, orderBy: { createdAt: "desc" } });
    },
    ["getServicesForExpertiseCached", String(expertiseId)],
    { tags: [tag.expertise(expertiseId), tag.serviceList()] }
  );
  return cached();
}

export async function getBlocksForPageCached(relUrl: string) {
  const cached = unstable_cache(
    async () => {
      const blocks = await db.block.findMany({ where: { pageRelUrl: relUrl } });
      const blockMap: Record<string, { content: string; blockType: string; elementTag?: string | null }> = {};
      for (const block of blocks) {
        blockMap[block.key] = {
          content: block.content,
          blockType: block.blockType as unknown as string,
          elementTag: block.elementTag,
        };
      }
      return blockMap;
    },
    ["getBlocksForPageCached", relUrl],
    {
      revalidate: false,
      tags: [tag.block(relUrl)],
    }
  );
  return cached();
}

export const getInsightsListCached = unstable_cache(
  async () => {
    return db.insight.findMany({ orderBy: { publishedAt: "desc" } });
  },
  ["getInsightsListCached"],
  {
    tags: [tag.insightsList()],
  }
) ;

export function getInsightBySlugCached(slug: string): Promise<Insight | null> {
  const cached = unstable_cache(
    async () => {
      return db.insight.findUnique({ where: { slug } });
    },
    ["getInsightBySlugCached", slug],
    { tags: [tag.insightSlug(slug), tag.insightsList()] }
  );
  return cached();
}


