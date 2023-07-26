import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import path from 'path';

import { RemoveStorageFileCommand } from '@/commands/implements/files/remove-storage-file.command';
import { PATH_FILES } from '@/constants/upload-file-paths';
import { IS_PRODUCTION } from '@/environments';
import { DataNotFoundException, FileNotFoundException } from '@/errors';
import { deleteFile } from '@/interceptors';
import { RemoveCloudflareImageService } from '@/services/cloudflare/remove-cloudflare-image';
import { RemoveCloudflareVideoService } from '@/services/cloudflare/remove-cloudflare-video';
import { digitalOceanDeleteFile } from '@/storages/digitalocean';

@CommandHandler(RemoveStorageFileCommand)
export class RemoveStorageFileCommandHandler
  implements ICommandHandler<RemoveStorageFileCommand>
{
  private readonly logger = new Logger(RemoveStorageFileCommandHandler.name);

  constructor(
    private readonly removeCloudflareImageService: RemoveCloudflareImageService,
    private readonly removeCloudflareVideoService: RemoveCloudflareVideoService
  ) {}

  async execute(data: RemoveStorageFileCommand) {
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data.file) {
        throw new FileNotFoundException();
      }
      const file = data.file;
      let removed = false;
      if (IS_PRODUCTION) {
        if (!!file.isVideo) {
          removed = await this.removeCloudflareVideoService.execute({
            filename: file.filename
          });
        } else if (!!file.isImage) {
          removed = await this.removeCloudflareImageService.execute({
            filename: file.filename
          });
        } else {
          removed = await digitalOceanDeleteFile(file.pathAndFilename);
        }
      } else {
        removed = await deleteFile(
          path.resolve(PATH_FILES, file.filenameAndExtension)
        );
      }
      if (!removed) {
        throw new FileNotFoundException();
      }
      return file;
    } catch (error) {
      this.logger.error(`File(#${data?.file?.id}): ${error?.message}`);
      return;
    }
  }
}
