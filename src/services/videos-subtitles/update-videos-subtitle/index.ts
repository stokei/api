import { UpdateVideosSubtitleCommand } from '@/commands/implements/videos-subtitles/update-videos-subtitle.command';
import { UpdateVideosSubtitleDTO } from '@/dtos/videos-subtitles/update-videos-subtitle.dto';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateVideosSubtitleService
  implements
    IBaseService<UpdateVideosSubtitleDTO, Promise<VideosSubtitleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateVideosSubtitleDTO): Promise<VideosSubtitleModel> {
    return await this.commandBus.execute(new UpdateVideosSubtitleCommand(data));
  }
}
