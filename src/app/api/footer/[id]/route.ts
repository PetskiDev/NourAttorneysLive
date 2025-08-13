import { db } from "~/server/db";
import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { tag } from "~/server/cacheTags";
import { footerUpdateSchema } from "~/lib/validators";

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
    const link = await db.footerLink.findUnique({ where: { id } });
    if (!link) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(link, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (id === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    const data = footerUpdateSchema.parse(await req.json());
    const updated = await db.footerLink.update({ where: { id }, data });
    revalidateTag(tag.footerList());
    revalidateTag(tag.footerId(id));
    return NextResponse.json(updated, { status: 200 });
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

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  return PUT(req, ctx);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (id === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    await db.footerLink.delete({ where: { id } });
    revalidateTag(tag.footerList());
    revalidateTag(tag.footerId(id));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}


