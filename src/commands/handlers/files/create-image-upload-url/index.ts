import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';
import { v4 as uuid } from 'uuid';

import { CreateImageUploadURLCommand } from '@/commands/implements/files/create-image-upload-url.command';
import { LOCAL_UPLOAD_IMAGE_URL } from '@/constants/upload-url';
import { IS_PRODUCTION } from '@/environments';
import {
  DataNotFoundException,
  ErrorUploadingFileException,
  FileNotFoundException
} from '@/errors';
import { CreateCloudflareImageUploadURLService } from '@/services/cloudflare/create-image-upload-url';
import { CreateFileService } from '@/services/files/create-file';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

@CommandHandler(CreateImageUploadURLCommand)
export class CreateImageUploadURLCommandHandler
  implements ICommandHandler<CreateImageUploadURLCommand>
{
  constructor(
    private readonly createFileService: CreateFileService,
    private readonly createCloudflareImageUploadURLService: CreateCloudflareImageUploadURLService
  ) {}

  async execute(command: CreateImageUploadURLCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    let filename;
    let uploadURL;
    if (!IS_PRODUCTION) {
      filename = uuid();
      uploadURL = LOCAL_UPLOAD_IMAGE_URL;
    } else {
      const cloudflareImageUploadURL =
        await this.createCloudflareImageUploadURLService.execute();
      if (!cloudflareImageUploadURL) {
        throw new ErrorUploadingFileException();
      }
      filename = cloudflareImageUploadURL.filename;
      uploadURL = cloudflareImageUploadURL.uploadURL;
    }
    const file = await this.createFileService.execute({
      filename,
      app: data.app,
      createdBy: data.createdBy
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
    command: CreateImageUploadURLCommand
  ): CreateImageUploadURLCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app)
    });
  }
}
