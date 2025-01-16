import 'server-only';

import { Client } from 'minio';
import { env } from '@cps/env';

const createS3Client = () => new Client({
  endPoint: env.AWS_ENDPOINT,
  accessKey: env.AWS_ACCESS_KEY_ID!,
  secretKey: env.AWS_SECRET_ACCESS_KEY!,
});

export async function uploadToS3(bucketName: string, file: Buffer, fileName: string) {
  try {
    await client.putObject(bucketName, fileName, file);
    console.log('File uploaded successfully');
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
}
export const client = createS3Client();