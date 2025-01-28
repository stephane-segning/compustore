import 'server-only';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '@cps/env';


const createS3Client = () => new S3Client({
  endpoint: env.AWS_ENDPOINT,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
  },
  region: env.AWS_REGION, // Specify the region
});

// export async function uploadToS3(bucketName: string, file: Buffer, fileName: string) {
//   try {
//     const command = new PutObjectCommand({
//       Bucket: bucketName,
//       Key: fileName,
//       Body: file,
//     });
//     await client.send(command);
//     console.log('File uploaded successfully');
//   } catch (err) {
//     console.error('Error uploading file:', err);
//     throw err;
//   }
// }
export const client = createS3Client();