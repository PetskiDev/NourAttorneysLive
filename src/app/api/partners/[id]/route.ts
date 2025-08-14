import { db } from "~/server/db";
import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { tag } from "~/server/cacheTags";
import { partnerUpdateSchema } from "~/lib/validators";

function parseId(param: string | string[] | undefined): number | null {
  if (!param || Array.isArray(param)) return null;
  const parsed = Number.parseInt(param, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

// using shared validator

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = parseId(id);
  if (parsed === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  const item = await db.partner.findUnique({ where: { id: parsed } });
  if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(item, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = parseId(id);
  if (parsed === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    const data = partnerUpdateSchema.parse(await req.json());
    const updated = await db.partner.update({ where: { id: parsed }, data });
    revalidateTag(tag.partnerList());
    revalidateTag(tag.partnerId(parsed));
    if (updated.slug) revalidateTag(tag.partnerSlug(updated.slug));
    return NextResponse.json(updated, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error && "errors" in err) {
      const zerr = err as unknown as { errors: Array<{ message?: string; path?: (string | number)[] }> };
      const first = zerr.errors?.[0];
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

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = parseId(id);
  if (parsed === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  const before = await db.partner.findUnique({ where: { id: parsed } });
  await db.partner.delete({ where: { id: parsed } });
  revalidateTag(tag.partnerList());
  revalidateTag(tag.partnerId(parsed));
  if (before?.slug) revalidateTag(tag.partnerSlug(before.slug));
  return NextResponse.json({ success: true }, { status: 200 });
}


