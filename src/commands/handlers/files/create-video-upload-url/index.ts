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
import { CreateCloudflareVideoUploadURLService } from '@/services/cloudflare/create-video-upload-url';
import { CreateFileService } from '@/services/files/create-file';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

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
    let uploadURL;
    if (!IS_PRODUCTION) {
      filename = uuid();
      uploadURL = LOCAL_UPLOAD_URL;
    } else {
      const cloudflareVideoUploadURL =
        await this.createCloudflareVideoUploadURLService.execute();
      if (!cloudflareVideoUploadURL) {
        throw new ErrorUploadingFileException();
      }
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
      uploadURL: appendPathnameToURL(uploadURL, file.id),
      file
    };
  }

  private clearData(
    command: CreateVideoUploadURLCommand
  ): CreateVideoUploadURLCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app)
    });
  }
}
