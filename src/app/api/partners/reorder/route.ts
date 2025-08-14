import { db } from "~/server/db";
import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { tag } from "~/server/cacheTags";
import { partnerReorderSchema } from "~/lib/validators";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { updates } = partnerReorderSchema.parse(await req.json());
    await db.$transaction(
      updates.map((u) =>
        db.partner.update({ where: { id: u.id }, data: { order: u.order } })
      )
    );
    revalidateTag(tag.partnerList());
    return NextResponse.json({ success: true }, { status: 200 });
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


