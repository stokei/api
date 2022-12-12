import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';
import { v4 as uuid } from 'uuid';

import { CreateVideoUploadURLCommand } from '@/commands/implements/files/create-video-upload-url.command';
import { LOCAL_UPLOAD_URL } from '@/constants/upload-url';
import { IS_PRODUCTION } from '@/environments';
import {
  DataNotFoundException,
  ErrorUploadingFileException,
  FileNotFoundException
} from '@/errors';
import { TusFileMetadataModel } from '@/models/tus-file-metadata.model';
import { CreateCloudflareVideoUploadURLService } from '@/services/cloudflare/create-video-upload-url';
import { CreateFileService } from '@/services/files/create-file';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';
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

    let filename;
    let metadata: TusFileMetadataModel;
    let uploadURL;
    if (!IS_PRODUCTION) {
      filename = uuid();
      uploadURL = LOCAL_UPLOAD_URL;
    } else {
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
      metadata = getFileMetadata(data.uploadMetadata);
      filename = cloudflareVideoUploadURL.filename;
      uploadURL = cloudflareVideoUploadURL.uploadURL;
    }
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
      uploadURL: IS_PRODUCTION
        ? uploadURL
        : appendPathnameToURL(uploadURL, file.id),
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
