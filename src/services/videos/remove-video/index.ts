import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveVideoCommand } from '@/commands/implements/videos/remove-video.command';
import { RemoveVideoDTO } from '@/dtos/videos/remove-video.dto';
import { VideoModel } from '@/models/video.model';

@Injectable()
export class RemoveVideoService
  implements IBaseService<RemoveVideoDTO, Promise<VideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveVideoDTO): Promise<VideoModel> {
    return await this.commandBus.execute(new RemoveVideoCommand(data));
  }
}
