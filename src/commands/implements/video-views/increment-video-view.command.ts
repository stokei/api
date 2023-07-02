import { ICommand } from '@nestjs/cqrs';

import { IncrementVideoViewDTO } from '@/dtos/video-views/increment-video-view.dto';

export class IncrementVideoViewCommand
  implements ICommand, IncrementVideoViewDTO
{
  videoView: string;
  app: string;
  createdBy: string;

  constructor(data: IncrementVideoViewDTO) {
    this.videoView = data.videoView;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
