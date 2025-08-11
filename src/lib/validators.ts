import { BlockType } from '@prisma/client';
import { z } from 'zod';

const allowedTags = [
  'p','h1','h2','h3','h4','h5','h6','div','span','small','blockquote','ul','ol','li'
] as const;

export const blockSchema = z.object({
  relUrl: z.string(),
  key: z.string(),
  content: z.string(),
  blockType: z.nativeEnum(BlockType),
  elementTag: z.enum(allowedTags).optional(),
});

export type BlockDTO = z.infer<typeof blockSchema>;

export const blockDeleteSchema = z.object({
  relUrl: z.string(),
  key: z.string(),
});

export type BlockDeleteDTO = z.infer<typeof blockDeleteSchema>;
