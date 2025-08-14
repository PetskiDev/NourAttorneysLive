import { db } from "~/server/db";
import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { tag } from "~/server/cacheTags";
import { partnerCreateSchema, slugSchema } from "~/lib/validators";
import { Prisma } from "@prisma/client";
import { z } from "zod";

function toSlug(input: string): string {
  const basic = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  // validate against shared slug rules to be safe
  return slugSchema.parse(basic);
}

export async function GET() {
  const list = await db.partner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  try {
    const partnerIncomingSchema = partnerCreateSchema.omit({ slug: true });
    const { name, industry } = partnerIncomingSchema.parse(await req.json());
    const slug = toSlug(name);
    // set order to the end
    const count = await db.partner.count();
    const created = await db.partner.create({
      data: { name, industry, slug, order: count },
    });
    revalidateTag(tag.partnerList());
    revalidateTag(tag.partnerSlug(created.slug));
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      const first = err.errors[0];
      return NextResponse.json(
        { message: first?.message ?? "Validation error", path: first?.path },
        { status: 400 }
      );
    }
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json({ message: "Slug already exists" }, { status: 409 });
    }
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}




