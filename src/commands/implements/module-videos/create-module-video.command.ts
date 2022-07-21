import { ICommand } from '@nestjs/cqrs';

import { CreateModuleVideoDTO } from '@/dtos/module-videos/create-module-video.dto';

export class CreateModuleVideoCommand
  implements ICommand, CreateModuleVideoDTO
{
  module: string;
  video: string;
  createdBy: string;

  constructor(data: CreateModuleVideoDTO) {
    this.module = data.module;
    this.video = data.video;
    this.createdBy = data.createdBy;
  }
}
