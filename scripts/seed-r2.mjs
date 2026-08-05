import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "../src/data");

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const files = [
  "content.json",
  "testimonials.json",
  "team.json",
  "users.json",
  "intern-testimonials.json",
];

for (const file of files) {
  const content = readFileSync(join(dataDir, file), "utf-8");
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `data/${file}`,
      Body: content,
      ContentType: "application/json",
    })
  );
  console.log(`✓ ${file} → data/${file}`);
}
