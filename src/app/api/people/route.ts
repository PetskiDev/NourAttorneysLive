import { db } from "~/server/db";
import { type NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { tag } from "~/server/cacheTags";

const PersonSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  imageUrl: z.string().url().optional(),
  order: z.number().int().optional(),
});

export async function GET() {
  try {
    const people = await db.people.findMany({
      orderBy: [{ order: "asc" }],
    });
    return NextResponse.json(people, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = PersonSchema.parse(await req.json());
    const count = await db.people.count();
    const newPerson = await db.people.create({
      data: {
        name: data.name,
        role: data.role,
        imageUrl: data.imageUrl,
        order: typeof data.order === "number" ? data.order : count,
      },
    });
    revalidateTag(tag.peopleList());
    return NextResponse.json(newPerson, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      // Return the first Zod error
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
