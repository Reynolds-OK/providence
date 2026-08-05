import { getObjectText, putObject, useR2 } from "@/lib/r2";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");

export async function readJson<T>(filename: string): Promise<T> {
  if (!useR2) {
    const raw = fs.readFileSync(path.join(dataDir, filename), "utf-8");
    return JSON.parse(raw) as T;
  }
  const raw = await getObjectText(`data/${filename}`);
  return JSON.parse(raw) as T;
}

export async function writeJson(filename: string, data: unknown): Promise<void> {
  if (!useR2) {
    fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2), "utf-8");
    return;
  }
  await putObject(`data/${filename}`, JSON.stringify(data, null, 2), "application/json");
}
