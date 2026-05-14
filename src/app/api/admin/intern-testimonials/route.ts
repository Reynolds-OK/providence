import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readJson, writeJson } from "@/lib/content";
import { NextResponse } from "next/server";
import type { InternTestimonial } from "@/lib/types";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await readJson<InternTestimonial[]>("intern-testimonials.json");
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = (await req.json()) as InternTestimonial[];
  await writeJson("intern-testimonials.json", data);
  return NextResponse.json({ ok: true });
}
