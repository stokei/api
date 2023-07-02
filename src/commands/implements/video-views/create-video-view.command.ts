import { ICommand } from '@nestjs/cqrs';

import { CreateVideoViewDTO } from '@/dtos/video-views/create-video-view.dto';

export class CreateVideoViewCommand implements ICommand, CreateVideoViewDTO {
  video: string;
  viewer?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateVideoViewDTO) {
    this.video = data.video;
    this.viewer = data.viewer;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
