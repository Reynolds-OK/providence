import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readJson, writeJson } from "@/lib/content";
import { NextResponse } from "next/server";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const content = await readJson<SiteContent>("content.json");
  return NextResponse.json(content);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  await writeJson("content.json", data);
  return NextResponse.json({ ok: true });
}
