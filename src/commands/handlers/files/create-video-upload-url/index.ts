import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';
import { v4 as uuid } from 'uuid';

import { CreateVideoUploadURLCommand } from '@/commands/implements/files/create-video-upload-url.command';
import { LOCAL_UPLOAD_VIDEO_URL } from '@/constants/upload-url';
import { DataNotFoundException, FileNotFoundException } from '@/errors';
import { CreateFileService } from '@/services/files/create-file';
import { getFileMetadata } from '@/utils/get-file-metadata';

@CommandHandler(CreateVideoUploadURLCommand)
export class CreateVideoUploadURLCommandHandler
  implements ICommandHandler<CreateVideoUploadURLCommand>
{
  constructor(private readonly createFileService: CreateFileService) {}

  async execute(command: CreateVideoUploadURLCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    const metadata =
      data.uploadMetadata && getFileMetadata(data.uploadMetadata);

    const filename = uuid();
    let uploadURL = LOCAL_UPLOAD_VIDEO_URL;

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
    const url = new URL(uploadURL);
    url.searchParams.set('file', file.id);
    uploadURL = url.toString();
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
