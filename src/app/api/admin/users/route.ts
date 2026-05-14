import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUsers, createUser, deleteUser } from "@/lib/users";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = getUsers().map(({ id, username }) => ({ id, username }));
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { username, password } = await req.json() as { username: string; password: string };

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  const existing = getUsers().find((u) => u.username === username);
  if (existing) {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }

  const user = await createUser(username, password);
  return NextResponse.json({ id: user.id, username: user.username });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json() as { id: string };
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  deleteUser(id);
  return NextResponse.json({ ok: true });
}
