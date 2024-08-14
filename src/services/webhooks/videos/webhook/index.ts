import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookVideosDTO } from '@/dtos/webhooks/webhook-videos.dto';
import { VideoNotFoundException } from '@/errors';
import { ActivateFileService } from '@/services/files/activate-file';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { UpdateFileService } from '@/services/files/update-file';
import { ActivateVideoService } from '@/services/videos/activate-video';
import { FindAllVideosService } from '@/services/videos/find-all-videos';

@Injectable()
export class WebhookVideosService implements IBaseService<WebhookVideosDTO> {
  private readonly logger = new Logger(WebhookVideosService.name);
  constructor(
    private readonly findFileByIdService: FindFileByIdService,
    private readonly updateFileService: UpdateFileService,
    private readonly findAllVideosService: FindAllVideosService,
    private readonly activateFileService: ActivateFileService,
    private readonly activateVideoService: ActivateVideoService
  ) {}

  async execute({ body }: WebhookVideosDTO) {
    const fileId = body?.creator || body?.fileId;
    try {
      const file = await this.findFileByIdService.execute(fileId);
      const status = (body?.status?.state || body?.status) as string;
      switch (status?.toLowerCase()) {
        case 'completed':
        case 'ready':
          await this.updateFileService.execute({
            data: {
              filename: body?.uid || body?.fileId,
              extension: body?.meta?.type?.split('/')?.pop() || body?.extension,
              mimetype: body?.meta?.type || body?.mimetype,
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
          if (!video) {
            throw new VideoNotFoundException();
          }
          await this.activateVideoService.execute({
            app: video.app,
            video: video.id,
            updatedBy: video.createdBy
          });
          return { status: HttpStatus.OK };
        default:
          return { status: HttpStatus.OK };
      }
    } catch (error) {
      this.logger.error(
        `WebhookVideos - Error file(#${fileId}): ${error?.message}`
      );
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
