import bcrypt from "bcryptjs";
import { readJson, writeJson } from "./content";

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
}

export function getUsers(): AdminUser[] {
  return readJson<AdminUser[]>("users.json");
}

export function saveUsers(users: AdminUser[]): void {
  writeJson("users.json", users);
}

export async function verifyUser(
  username: string,
  password: string
): Promise<AdminUser | null> {
  const users = getUsers();
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
  const user: AdminUser = {
    id: crypto.randomUUID(),
    username,
    passwordHash,
  };
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  return user;
}

export function deleteUser(id: string): void {
  const users = getUsers().filter((u) => u.id !== id);
  saveUsers(users);
}
