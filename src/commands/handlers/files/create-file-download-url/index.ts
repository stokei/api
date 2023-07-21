import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { s3Client } from '@/clients/s3';
import { CreateFileDownloadURLCommand } from '@/commands/implements/files/create-file-download-url.command';
import { DIGITALOCEAN_BUCKET, IS_PRODUCTION } from '@/environments';
import { DataNotFoundException, FileNotFoundException } from '@/errors';
import { FindFileByIdService } from '@/services/files/find-file-by-id';

@CommandHandler(CreateFileDownloadURLCommand)
export class CreateFileDownloadURLCommandHandler
  implements ICommandHandler<CreateFileDownloadURLCommand>
{
  constructor(private readonly findFileByIdService: FindFileByIdService) {}

  async execute(command: CreateFileDownloadURLCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const file = await this.findFileByIdService.execute(data.file);
    if (!file || !!file.isImage || !!file.isVideo) {
      throw new FileNotFoundException();
    }
    if (!IS_PRODUCTION) {
      return file.url;
    }
    const expiresInOneHour = 60 * 60;
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: DIGITALOCEAN_BUCKET,
        Key: file.pathAndFilename
      }),
      { expiresIn: expiresInOneHour }
    );
    return url;
  }

  private clearData(
    command: CreateFileDownloadURLCommand
  ): CreateFileDownloadURLCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      file: cleanValue(command?.file)
    });
  }
}
