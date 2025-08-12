import { db } from "~/server/db";
import { type NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { tag } from "~/server/cacheTags";
import { insightCreateSchema } from "~/lib/validators";

export async function GET() {
  try {
    const items = await db.insight.findMany({ orderBy: { publishedAt: "desc" } });
    return NextResponse.json(items, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = insightCreateSchema.parse(await req.json());
    const created = await db.insight.create({
      data: {
        title: data.title,
        description: data.description,
        slug: data.slug,
        category: data.category,
        publisher: data.publisher,
        imageUrl: data.imageUrl ?? undefined,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    });
    revalidateTag(tag.insightsList());
    revalidateTag(tag.insightSlug(created.slug));
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      const first = err.errors[0];
      return NextResponse.json(
        { message: first?.message ?? "Validation error", path: first?.path },
        { status: 400 }
      );
    }
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}



