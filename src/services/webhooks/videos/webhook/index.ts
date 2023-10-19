import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookVideosDTO } from '@/dtos/webhooks/webhook-videos.dto';
import { ActivateFileService } from '@/services/files/activate-file';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { UpdateFileService } from '@/services/files/update-file';
import { ActivateVideoService } from '@/services/videos/activate-video';
import { FindAllVideosService } from '@/services/videos/find-all-videos';

@Injectable()
export class WebhookVideosService implements IBaseService<WebhookVideosDTO> {
  constructor(
    private readonly findFileByIdService: FindFileByIdService,
    private readonly updateFileService: UpdateFileService,
    private readonly findAllVideosService: FindAllVideosService,
    private readonly activateFileService: ActivateFileService,
    private readonly activateVideoService: ActivateVideoService
  ) {}

  async execute({ body }: WebhookVideosDTO) {
    try {
      const file = await this.findFileByIdService.execute(body?.creator);
      const status = body?.status?.state;
      switch (status) {
        case 'ready':
          await this.updateFileService.execute({
            data: {
              filename: body?.uid,
              extension: body?.meta?.type?.split('/')?.pop(),
              mimetype: body?.meta?.type,
              duration: parseFloat(body?.duration),
              size: parseFloat(body?.size),
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
          try {
            const videos = await this.findAllVideosService.execute({
              where: {
                AND: {
                  file: {
                    equals: file.id
                  }
                }
              },
              page: {
                limit: 1
              }
            });
            const video = videos?.items?.[0];
            if (video) {
              await this.activateVideoService.execute({
                app: video.app,
                video: video.id,
                updatedBy: video.createdBy
              });
            }
          } catch (error) {}
          return { status: HttpStatus.OK };
        default:
          return { status: HttpStatus.OK };
      }
    } catch (error) {
      return { status: HttpStatus.OK };
    }
  }
}
