import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export const useR2 = !!process.env.R2_ACCESS_KEY_ID;

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
});

const bucket = process.env.R2_BUCKET_NAME ?? "";

export async function getObjectText(key: string): Promise<string> {
  const res = await r2.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  return (await res.Body?.transformToString()) ?? "";
}

export async function putObject(
  key: string,
  body: Buffer | string,
  contentType: string
): Promise<string> {
  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}
