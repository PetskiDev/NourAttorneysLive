import { NextResponse } from "next/server";
import { z } from "zod";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

type MediaListItem = {
  key: string;
  url: string;
  name: string;
  size: number;
  uploadedAt: string;
};

export async function GET() {
  const { files } = await utapi.listFiles({ limit: 200, offset: 0 });
  const mapped: MediaListItem[] = files.map((f) => ({
    key: f.key,
    url: `https://utfs.io/f/${f.key}`,
    name: f.name,
    size: f.size,
    uploadedAt: new Date(f.uploadedAt).toISOString(),
  }));
  return NextResponse.json(mapped satisfies MediaListItem[]);
}

const DeleteSchema = z.object({ keys: z.array(z.string()).min(1) });

export async function DELETE(req: Request) {
  const { keys } = DeleteSchema.parse(await req.json());
  await utapi.deleteFiles(keys);
  return NextResponse.json({ ok: true });
}


