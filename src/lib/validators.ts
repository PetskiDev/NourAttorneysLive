import { BlockType } from '@prisma/client';
import { z } from 'zod';

export const blockSchema = z.object({
  relUrl: z.string(),
  key: z.string(),
  content: z.string(),
  blockType: z.nativeEnum(BlockType),
});

export type BlockDTO = z.infer<typeof blockSchema>;
