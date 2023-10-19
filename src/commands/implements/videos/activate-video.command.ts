import { ICommand } from '@nestjs/cqrs';

import { ActivateVideoDTO } from '@/dtos/videos/activate-video.dto';

export class ActivateVideoCommand implements ICommand, ActivateVideoDTO {
  video: string;
  app: string;
  updatedBy: string;
  constructor(data: ActivateVideoDTO) {
    this.video = data.video;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
