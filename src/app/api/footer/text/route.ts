import { db } from "~/server/db";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { tag } from "~/server/cacheTags";

const upsertSchema = z.object({
  key: z.enum(["LOCATION", "WORKING_HOURS"]),
  value: z.string().min(1),
});

export async function GET() {
  const rows = await db.footerText.findMany();
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;
  return NextResponse.json(map, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { key, value } = upsertSchema.parse(await req.json());
    await db.footerText.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    revalidateTag(tag.footerText());
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      const first = e.errors[0];
      return NextResponse.json({ message: first?.message ?? "Validation error" }, { status: 400 });
    }
    if (e instanceof Error) return NextResponse.json({ message: e.message }, { status: 400 });
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}


