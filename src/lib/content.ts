import { put, list } from "@vercel/blob";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

export async function readJson<T>(filename: string): Promise<T> {
  if (!useBlob) {
    const raw = fs.readFileSync(path.join(dataDir, filename), "utf-8");
    return JSON.parse(raw) as T;
  }
  const { blobs } = await list({ prefix: `data/${filename}` });
  const blob = blobs.find((b) => b.pathname === `data/${filename}`);
  if (!blob) throw new Error(`Blob not found: data/${filename}`);
  const res = await fetch(blob.url, { cache: "no-store" });
  return res.json() as Promise<T>;
}

export async function writeJson(filename: string, data: unknown): Promise<void> {
  if (!useBlob) {
    fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2), "utf-8");
    return;
  }
  await put(`data/${filename}`, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  });
}
