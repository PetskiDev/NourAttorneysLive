import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { tag } from "~/server/cacheTags";
import { insightUpdateSchema } from "~/lib/validators";

const UpdateSchema = insightUpdateSchema;

function parseId(param: string | string[] | undefined): number | null {
  if (!param || Array.isArray(param)) return null;
  const parsed = Number.parseInt(param, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (id === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    const insight = await db.insight.findUnique({ where: { id } });
    if (!insight) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(insight, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (id === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    const data = UpdateSchema.parse(await req.json());
    const updated = await db.insight.update({
      where: { id },
      data: {
        ...("publishedAt" in data && data.publishedAt
          ? { publishedAt: new Date(data.publishedAt) }
          : {}),
        title: data.title,
        description: data.description,
        // slug is immutable on updates, enforced in validator; do not spread here
        category: data.category,
        publisher: data.publisher,
        imageUrl: data.imageUrl ?? undefined,
      },
    });
    revalidateTag(tag.insightsList());
    revalidateTag(tag.insightId(id));
    if (updated.slug) revalidateTag(tag.insightSlug(updated.slug));
    return NextResponse.json(updated, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (id === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    await db.insight.delete({ where: { id } });
    revalidateTag(tag.insightsList());
    revalidateTag(tag.insightId(id));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}



