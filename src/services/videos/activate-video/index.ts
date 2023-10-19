import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ActivateVideoCommand } from '@/commands/implements/videos/activate-video.command';
import { ActivateVideoDTO } from '@/dtos/videos/activate-video.dto';
import { VideoModel } from '@/models/video.model';

@Injectable()
export class ActivateVideoService
  implements IBaseService<ActivateVideoDTO, Promise<VideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ActivateVideoDTO): Promise<VideoModel> {
    return await this.commandBus.execute(new ActivateVideoCommand(data));
  }
}
