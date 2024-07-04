import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    awsCredentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      bucketName: process.env.AWS_BUCKET_NAME,
      region: process.env.AWS_REGION,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    cloudFront: {
      url: process.env.CLOUDFRONT_URL,
    },
  };
});
