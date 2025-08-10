import { NextResponse } from "next/server";
import { db } from "~/server/db";

// Lightweight list of all services for client search (navbar)
export async function GET() {
  const list = await db.service.findMany({
    select: { id: true, title: true, slug: true },
    orderBy: { title: "asc" },
  });
  return NextResponse.json(list);
}


