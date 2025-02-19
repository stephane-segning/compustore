import { createId } from '@paralleldrive/cuid2';
import { client } from './client';
import { env } from '@cps/env';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function createPresignedPostUrl(filename: string) {
  try {
    const objectName = `images/${createId()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET,
      Key: objectName,
    });
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });  

    const getBasePublicUrl = `${env.AWS_ENDPOINT}`;

    const publicUrl = `${getBasePublicUrl}/${env.AWS_BUCKET}/${objectName}`;

    return { url, publicUrl }; 
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw new Error("Failed to generate presigned URL.");
  }
}