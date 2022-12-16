import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateVideoUploadURLCommand } from '@/commands/implements/files/create-video-upload-url.command';
import {
  DataNotFoundException,
  ErrorUploadingFileException,
  FileNotFoundException
} from '@/errors';
import { CreateCloudflareVideoUploadURLService } from '@/services/cloudflare/create-video-upload-url';
import { CreateFileService } from '@/services/files/create-file';
import { getFileMetadata } from '@/utils/get-file-metadata';

@CommandHandler(CreateVideoUploadURLCommand)
export class CreateVideoUploadURLCommandHandler
  implements ICommandHandler<CreateVideoUploadURLCommand>
{
  constructor(
    private readonly createFileService: CreateFileService,
    private readonly createCloudflareVideoUploadURLService: CreateCloudflareVideoUploadURLService
  ) {}

  async execute(command: CreateVideoUploadURLCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    const metadata =
      data.uploadMetadata && getFileMetadata(data.uploadMetadata);

    const cloudflareVideoUploadURL =
      await this.createCloudflareVideoUploadURLService.execute({
        createdBy: data.createdBy,
        tusResumable: data.tusResumable,
        uploadLength: data.uploadLength,
        uploadMetadata: data.uploadMetadata
      });
    if (!cloudflareVideoUploadURL) {
      throw new ErrorUploadingFileException();
    }
    const filename = cloudflareVideoUploadURL.filename;
    const uploadURL = cloudflareVideoUploadURL.uploadURL;

    const file = await this.createFileService.execute({
      filename,
      extension: metadata?.extension,
      mimetype: metadata?.filetype,
      size: data.uploadLength && parseInt(data.uploadLength),
      app: data.app || metadata.appId,
      createdBy: data.createdBy || metadata.accountId
    });
    if (!file) {
      throw new FileNotFoundException();
    }
    return {
      uploadURL,
      file
    };
  }

  private clearData(
    command: CreateVideoUploadURLCommand
  ): CreateVideoUploadURLCommand {
    return cleanObject({
      tusResumable: cleanValue(command?.tusResumable),
      uploadLength: cleanValue(command?.uploadLength),
      uploadMetadata: cleanValue(command?.uploadMetadata),
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app)
    });
  }
}
