import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateVideoAuthorCommand } from '@/commands/implements/video-authors/update-video-author.command';
import { UpdateVideoAuthorDTO } from '@/dtos/video-authors/update-video-author.dto';
import { VideoAuthorModel } from '@/models/video-author.model';

@Injectable()
export class UpdateVideoAuthorService
  implements IBaseService<UpdateVideoAuthorDTO, Promise<VideoAuthorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateVideoAuthorDTO): Promise<VideoAuthorModel> {
    return await this.commandBus.execute(new UpdateVideoAuthorCommand(data));
  }
}
