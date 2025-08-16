import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { tag } from "~/server/cacheTags";

const UpdatePersonSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  imageUrl: z.string().url().nullable().optional(),
  order: z.number().int().optional(),
});

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
    const person = await db.people.findUnique({ where: { id } });
    if (!person) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(person, { status: 200 });
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
    const data = UpdatePersonSchema.parse(await req.json());
    const updated = await db.people.update({ where: { id }, data });
    revalidateTag(tag.peopleList());
    revalidateTag(tag.person(id));
    return NextResponse.json(updated, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  return PUT(req, ctx);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (id === null) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    await db.people.delete({ where: { id } });
    revalidateTag(tag.peopleList());
    revalidateTag(tag.person(id));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}


