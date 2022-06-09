import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateVideosTagCommand } from '@/commands/implements/videos-tags/update-videos-tag.command';
import { UpdateVideosTagDTO } from '@/dtos/videos-tags/update-videos-tag.dto';
import { VideosTagModel } from '@/models/videos-tag.model';

@Injectable()
export class UpdateVideosTagService
  implements IBaseService<UpdateVideosTagDTO, Promise<VideosTagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateVideosTagDTO): Promise<VideosTagModel> {
    return await this.commandBus.execute(new UpdateVideosTagCommand(data));
  }
}
