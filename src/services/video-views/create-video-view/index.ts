import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateVideoViewCommand } from '@/commands/implements/video-views/create-video-view.command';
import { CreateVideoViewDTO } from '@/dtos/video-views/create-video-view.dto';
import { VideoViewModel } from '@/models/video-view.model';

@Injectable()
export class CreateVideoViewService
  implements IBaseService<CreateVideoViewDTO, Promise<VideoViewModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateVideoViewDTO): Promise<VideoViewModel> {
    return await this.commandBus.execute(new CreateVideoViewCommand(data));
  }
}
