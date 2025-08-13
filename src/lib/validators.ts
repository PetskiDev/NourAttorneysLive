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

// Shared primitive schemas
export const slugSchema = z
  .string()
  .min(1, { message: 'Slug is required' })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase letters/numbers and hyphens only',
  });

// Insights
export const insightCategoryValues = [
  'ARTICLES',
  'NEWS',
  'UPDATES',
  'PUBLICATIONS',
] as const;

export const insightCategorySchema = z.enum(insightCategoryValues);

export const insightCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: slugSchema,
  category: insightCategorySchema,
  publisher: z.string().min(1),
  imageUrl: z.string().url().optional().nullable(),
  publishedAt: z.string().datetime().optional(),
});

// For updates, slug is immutable; do not allow changing it
export const insightUpdateSchema = insightCreateSchema.partial().omit({ slug: true });

export const insightResponseSchema = z.object({
  id: z.number().int(),
  slug: slugSchema,
  title: z.string(),
  description: z.string(),
  category: insightCategorySchema,
  publisher: z.string(),
  imageUrl: z.string().url().nullable().optional(),
  publishedAt: z.union([z.string(), z.date()]),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export const insightArraySchema = z.array(insightResponseSchema);

export type InsightCreateDTO = z.infer<typeof insightCreateSchema>;
export type InsightUpdateDTO = z.infer<typeof insightUpdateSchema>;
export type InsightResponseDTO = z.infer<typeof insightResponseSchema>;

// Footer
export const footerCategoryValues = [
  'SOCIAL',
  'NAVIGATION',
  'CONTACTS',
] as const;

export const footerCategorySchema = z.enum(footerCategoryValues);

export const footerCreateSchema = z.object({
  category: footerCategorySchema,
  label: z.string().min(1),
  href: z.string().min(1),
  order: z.number().int().optional().default(0),
});

export const footerUpdateSchema = footerCreateSchema.partial();

export const footerReorderSchema = z.object({
  updates: z.array(z.object({ id: z.number().int(), order: z.number().int() })),
});
