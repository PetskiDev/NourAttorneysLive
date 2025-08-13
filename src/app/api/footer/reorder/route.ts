import { db } from "~/server/db";
import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { tag } from "~/server/cacheTags";
import { footerReorderSchema } from "~/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const { updates } = footerReorderSchema.parse(await req.json());
    // Perform in a transaction for consistency
    await db.$transaction(
      updates.map((u) =>
        db.footerLink.update({ where: { id: u.id }, data: { order: u.order } })
      )
    );
    revalidateTag(tag.footerList());
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


