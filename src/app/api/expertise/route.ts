import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { tag } from "~/server/cacheTags";

export async function GET() {
  const list = await db.expertise.findMany({
    orderBy: { createdAt: "desc" },
    include: { services: true },
  });
  return NextResponse.json(list);
}

const CreateExpertiseSchema = z.object({ title: z.string().min(1) });

export async function POST(req: Request) {
  const data = CreateExpertiseSchema.parse(await req.json());
  const created = await db.expertise.create({ data: { title: data.title } });
  revalidateTag(tag.expertiseList());
  return NextResponse.json(created, { status: 201 });
}


