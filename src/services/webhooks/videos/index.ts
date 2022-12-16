import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookVideosDTO } from '@/dtos/webhooks/webhook-videos.dto';
import { ActivateFileService } from '@/services/files/activate-file';
import { FindFileByFilenameService } from '@/services/files/find-file-by-filename';
import { UpdateFileService } from '@/services/files/update-file';

@Injectable()
export class WebhookVideosService implements IBaseService<WebhookVideosDTO> {
  constructor(
    private readonly findFileByFilenameService: FindFileByFilenameService,
    private readonly updateFileService: UpdateFileService,
    private readonly activateFileService: ActivateFileService
  ) {}

  async execute({ body, signature }: WebhookVideosDTO) {
    try {
      const file = await this.findFileByFilenameService.execute(body?.uid);
      const status = body?.status?.state;
      switch (status) {
        case 'ready':
          await this.updateFileService.execute({
            data: {
              duration: parseFloat(body?.duration),
              size: parseInt(body?.size, 10),
              updatedBy: file.createdBy
            },
            where: {
              app: file.app,
              file: file.id
            }
          });
          await this.activateFileService.execute({
            app: file.app,
            file: file.id,
            updatedBy: file.createdBy
          });
          return { status: HttpStatus.OK };
        default:
          return { status: HttpStatus.OK };
      }
    } catch (error) {
      return { status: HttpStatus.OK };
    }
  }
}
