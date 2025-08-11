import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { tag } from "~/server/cacheTags";

const UpdateServiceSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, hyphen-separated")
    .optional(),
});

function parseId(param: string | string[] | undefined): number | null {
  if (!param || Array.isArray(param)) return null;
  const parsed = Number.parseInt(param, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function GET(_req: Request, { params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const id = parseId(serviceId);
  if (id === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    const item = await db.service.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(item, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const id = parseId(serviceId);
  if (id === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    const data = UpdateServiceSchema.parse(await req.json());
    const before = await db.service.findUnique({ where: { id } });
    const updated = await db.service.update({ where: { id }, data });
    // Invalidate lists and slug-specific caches (old and new if changed)
    revalidateTag(tag.serviceList());
    if (before?.slug) revalidateTag(tag.serviceSlug(before.slug));
    const newSlug = data.slug ?? before?.slug;
    if (newSlug) revalidateTag(tag.serviceSlug(newSlug));
    return NextResponse.json(updated, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ serviceId: string }> }) {
  return PUT(req, ctx);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const id = parseId(serviceId);
  if (id === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    const before = await db.service.findUnique({ where: { id } });
    await db.service.delete({ where: { id } });
    revalidateTag(tag.serviceList());
    if (before?.slug) revalidateTag(tag.serviceSlug(before.slug));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}


