import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveVideoAuthorCommand } from '@/commands/implements/video-authors/remove-video-author.command';
import { RemoveVideoAuthorDTO } from '@/dtos/video-authors/remove-video-author.dto';
import { VideoAuthorModel } from '@/models/video-author.model';

@Injectable()
export class RemoveVideoAuthorService
  implements IBaseService<RemoveVideoAuthorDTO, Promise<VideoAuthorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveVideoAuthorDTO): Promise<VideoAuthorModel> {
    return await this.commandBus.execute(new RemoveVideoAuthorCommand(data));
  }
}
