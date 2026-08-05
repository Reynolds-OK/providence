import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { putObject, useR2 } from "@/lib/r2";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `upload-${Date.now()}.${ext}`;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (useR2) {
    const url = await putObject(`images/${filename}`, buffer, file.type || "image/jpeg");
    return NextResponse.json({ url });
  }

  const filepath = path.join(process.cwd(), "public", "images", filename);
  await writeFile(filepath, buffer);
  return NextResponse.json({ url: `/images/${filename}` });
}
