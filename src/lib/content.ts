import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");

export function readJson<T>(filename: string): T {
  const raw = fs.readFileSync(path.join(dataDir, filename), "utf-8");
  return JSON.parse(raw) as T;
}

export function writeJson(filename: string, data: unknown): void {
  fs.writeFileSync(
    path.join(dataDir, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}
