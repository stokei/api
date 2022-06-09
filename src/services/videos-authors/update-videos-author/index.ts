import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateVideosAuthorCommand } from '@/commands/implements/videos-authors/update-videos-author.command';
import { UpdateVideosAuthorDTO } from '@/dtos/videos-authors/update-videos-author.dto';
import { VideosAuthorModel } from '@/models/videos-author.model';

@Injectable()
export class UpdateVideosAuthorService
  implements IBaseService<UpdateVideosAuthorDTO, Promise<VideosAuthorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateVideosAuthorDTO): Promise<VideosAuthorModel> {
    return await this.commandBus.execute(new UpdateVideosAuthorCommand(data));
  }
}
