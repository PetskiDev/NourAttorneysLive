// /app/api/blocks/route.ts
import { db } from '~/server/db';
import { blockSchema, blockDeleteSchema } from '~/lib/validators';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { revalidateTag } from 'next/cache';
import { tag } from '~/server/cacheTags';

export async function POST(req: Request) {
  try {
    const data = blockSchema.parse(await req.json());

    await db.block.upsert({
      where: { pageRelUrl_key: { pageRelUrl: data.relUrl, key: data.key } },
      update: { content: data.content, blockType: data.blockType, elementTag: data.elementTag },
      create: {
        pageRelUrl: data.relUrl,
        key: data.key,
        content: data.content,
        blockType: data.blockType,
        elementTag: data.elementTag,
      },
    });

    revalidateTag(tag.block(data.relUrl));


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const data = blockDeleteSchema.parse(await req.json());
    await db.block.delete({
      where: { pageRelUrl_key: { pageRelUrl: data.relUrl, key: data.key } },
    });
    revalidateTag(tag.block(data.relUrl));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
