import { CreateVideosTagCommand } from '@/commands/implements/videos-tags/create-videos-tag.command';
import { CreateVideosTagDTO } from '@/dtos/videos-tags/create-videos-tag.dto';
import { VideosTagModel } from '@/models/videos-tag.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateVideosTagService
  implements IBaseService<CreateVideosTagDTO, Promise<VideosTagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateVideosTagDTO): Promise<VideosTagModel> {
    return await this.commandBus.execute(new CreateVideosTagCommand(data));
  }
}
