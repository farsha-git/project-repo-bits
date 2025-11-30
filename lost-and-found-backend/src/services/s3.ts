// src/services/s3.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION!;
const bucket = process.env.S3_BUCKET!;
const client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function createPresignedUploadUrl(key: string, contentType = "image/jpeg", expiresIn = 900) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
    ACL: "private",
  });
  const url = await getSignedUrl(client, command, { expiresIn });
  return url;
}
