import { put } from "@vercel/blob";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "../src/data");

const files = [
  "content.json",
  "testimonials.json",
  "team.json",
  "users.json",
  "intern-testimonials.json",
];

for (const file of files) {
  const content = readFileSync(join(dataDir, file), "utf-8");
  const result = await put(`data/${file}`, content, {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  });
  console.log(`✓ ${file} → ${result.url}`);
}
