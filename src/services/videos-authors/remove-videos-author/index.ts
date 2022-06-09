import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveVideosAuthorCommand } from '@/commands/implements/videos-authors/remove-videos-author.command';
import { RemoveVideosAuthorDTO } from '@/dtos/videos-authors/remove-videos-author.dto';
import { VideosAuthorModel } from '@/models/videos-author.model';

@Injectable()
export class RemoveVideosAuthorService
  implements IBaseService<RemoveVideosAuthorDTO, Promise<VideosAuthorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveVideosAuthorDTO): Promise<VideosAuthorModel> {
    return await this.commandBus.execute(new RemoveVideosAuthorCommand(data));
  }
}
