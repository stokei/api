import { CreateVideosSubtitleCommand } from '@/commands/implements/videos-subtitles/create-videos-subtitle.command';
import { CreateVideosSubtitleDTO } from '@/dtos/videos-subtitles/create-videos-subtitle.dto';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateVideosSubtitleService
  implements
    IBaseService<CreateVideosSubtitleDTO, Promise<VideosSubtitleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateVideosSubtitleDTO): Promise<VideosSubtitleModel> {
    return await this.commandBus.execute(new CreateVideosSubtitleCommand(data));
  }
}
