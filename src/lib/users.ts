import bcrypt from "bcryptjs";
import { readJson, writeJson } from "./content";

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
}

export async function getUsers(): Promise<AdminUser[]> {
  return readJson<AdminUser[]>("users.json");
}

export async function saveUsers(users: AdminUser[]): Promise<void> {
  await writeJson("users.json", users);
}

export async function verifyUser(
  username: string,
  password: string
): Promise<AdminUser | null> {
  const users = await getUsers();
  const user = users.find((u) => u.username === username);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}

export async function createUser(
  username: string,
  password: string
): Promise<AdminUser> {
  const passwordHash = await bcrypt.hash(password, 12);
  const user: AdminUser = { id: crypto.randomUUID(), username, passwordHash };
  const users = await getUsers();
  users.push(user);
  await saveUsers(users);
  return user;
}

export async function deleteUser(id: string): Promise<void> {
  const users = (await getUsers()).filter((u) => u.id !== id);
  await saveUsers(users);
}
