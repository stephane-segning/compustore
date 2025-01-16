import { createId } from '@paralleldrive/cuid2';
import { client } from './client';
import { env } from '@cps/env';

export async function createPresignedPostUrl(filename: string) {
  try {
    const objectName = `images/${createId()}-${filename}`;

    const url = await client.presignedPutObject(env.AWS_BUCKET, objectName, 3600);  

    const getBasePublicUrl = `${env.S3_SCHEME}://${env.AWS_ENDPOINT}`;

    const publicUrl = `${getBasePublicUrl}/${env.AWS_BUCKET}/${objectName}`;

    return { url, publicUrl }; 
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw new Error("Failed to generate presigned URL.");
  }
}