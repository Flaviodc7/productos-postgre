import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';
import config from '@src/config';

@Injectable()
export class FilesService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string, bucket: string) {
    const { accessKeyId, region, secretAccessKey } =
      this.configService.awsCredentials;
    const cloudFrontUrl = this.configService.cloudFront.url;
    try {
      const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey,
      });
      const ext = filename.split('.').pop();
      const uploadResult = await s3
        .upload({
          Bucket: bucket,
          Body: dataBuffer,
          Key: `${uuid()}-${filename}`,
          ContentType: `*/${ext}`,
        })
        .promise();

      return {
        key: uploadResult.Key,
        url: `${cloudFrontUrl}/${uploadResult.Key}`,
      };
    } catch (err) {
      console.log(err);
      return { key: 'error', url: err.message };
    }
  }
}
