import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateVideoCommand } from '@/commands/implements/videos/update-video.command';
import { UpdateVideoDTO } from '@/dtos/videos/update-video.dto';
import { VideoModel } from '@/models/video.model';

@Injectable()
export class UpdateVideoService
  implements IBaseService<UpdateVideoDTO, Promise<VideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateVideoDTO): Promise<VideoModel> {
    return await this.commandBus.execute(new UpdateVideoCommand(data));
  }
}
