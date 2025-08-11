import type { BlockType } from "@prisma/client";
import { getBlocksForPageCached } from "./cachedReads";

export async function getBlocksForPage(page: string) {
  // Delegate to the cached variant tagged by page
  return getBlocksForPageCached(page) as Promise<
    Record<string, { content: string; blockType: BlockType; elementTag?: string | null }>
  >;
}
