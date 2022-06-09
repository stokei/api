import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveVideosTagCommand } from '@/commands/implements/videos-tags/remove-videos-tag.command';
import { RemoveVideosTagDTO } from '@/dtos/videos-tags/remove-videos-tag.dto';
import { VideosTagModel } from '@/models/videos-tag.model';

@Injectable()
export class RemoveVideosTagService
  implements IBaseService<RemoveVideosTagDTO, Promise<VideosTagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveVideosTagDTO): Promise<VideosTagModel> {
    return await this.commandBus.execute(new RemoveVideosTagCommand(data));
  }
}
