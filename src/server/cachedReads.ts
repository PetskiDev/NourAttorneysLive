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

export const getFooterLinksCached = unstable_cache(
  async () => {
    return db.footerLink.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }, { createdAt: "asc" }],
    });
  },
  ["getFooterLinksCached"],
  { tags: [tag.footerList()] }
);

export const getFooterTextCached = unstable_cache(
  async () => {
    const rows = await db.footerText.findMany();
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return map as { LOCATION?: string; WORKING_HOURS?: string };
  },
  ["getFooterTextCached"],
  { tags: [tag.footerText()] }
);



export const getPartnersListCached = unstable_cache(
  async () => {
    return db.partner.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  },
  ["getPartnersListCached"],
  {
    tags: [tag.partnerList()],
  }
);

export function getPartnerBySlugCached(slug: string) {
  const cached = unstable_cache(
    async () => {
      return db.partner.findUnique({ where: { slug } });
    },
    ["getPartnerBySlugCached", slug],
    { tags: [tag.partnerSlug(slug), tag.partnerList()] }
  );
  return cached();
}