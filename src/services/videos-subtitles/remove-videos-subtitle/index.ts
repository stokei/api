import { RemoveVideosSubtitleCommand } from '@/commands/implements/videos-subtitles/remove-videos-subtitle.command';
import { RemoveVideosSubtitleDTO } from '@/dtos/videos-subtitles/remove-videos-subtitle.dto';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveVideosSubtitleService
  implements
    IBaseService<RemoveVideosSubtitleDTO, Promise<VideosSubtitleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveVideosSubtitleDTO): Promise<VideosSubtitleModel> {
    return await this.commandBus.execute(new RemoveVideosSubtitleCommand(data));
  }
}
