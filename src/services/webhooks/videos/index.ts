import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookVideosDTO } from '@/dtos/webhooks/webhook-videos.dto';
import { ActivateFileService } from '@/services/files/activate-file';
import { FindFileByFilenameService } from '@/services/files/find-file-by-filename';

@Injectable()
export class WebhookVideosService implements IBaseService<WebhookVideosDTO> {
  constructor(
    private readonly findFileByFilenameService: FindFileByFilenameService,
    private readonly activateFileService: ActivateFileService
  ) {}

  async execute({ body, signature }: WebhookVideosDTO) {
    const status = body?.status?.state;
    try {
      const file = await this.findFileByFilenameService.execute(body?.uid);
      switch (status) {
        case 'ready':
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
