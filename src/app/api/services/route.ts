import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { tag } from "~/server/cacheTags";
import { db } from "~/server/db";

// Lightweight list of all services for client search (navbar)
export async function GET() {
  const list = await db.service.findMany({
    select: { id: true, title: true, slug: true },
    orderBy: { title: "asc" },
  });
  return NextResponse.json(list);
}


