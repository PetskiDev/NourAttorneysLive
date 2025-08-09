import type { BlockType } from "@prisma/client";
import { db } from "./db";

export async function getBlocksForPage(page: string) {
  const blocks = await db.block.findMany({
    where: { pageRelUrl: page },
  });

  const blockMap: Record<string, { content: string; blockType: BlockType; elementTag?: string | null }> = {};
  for (const block of blocks) {
    blockMap[block.key] = { content: block.content, blockType: block.blockType, elementTag: block.elementTag };
  }

  return blockMap;
}
