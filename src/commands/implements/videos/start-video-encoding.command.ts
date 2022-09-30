import { ICommand } from '@nestjs/cqrs';

import { StartVideoEncodingDTO } from '@/dtos/videos/start-video-encoding.dto';

export class StartVideoEncodingCommand
  implements ICommand, StartVideoEncodingDTO
{
  video: string;
  app: string;
  updatedBy: string;
  constructor(data: StartVideoEncodingDTO) {
    this.video = data.video;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
