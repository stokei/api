import { CreateVideoCommand } from '@/commands/implements/videos/create-video.command';
import { CreateVideoDTO } from '@/dtos/videos/create-video.dto';
import { VideoModel } from '@/models/video.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateVideoService
  implements IBaseService<CreateVideoDTO, Promise<VideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateVideoDTO): Promise<VideoModel> {
    return await this.commandBus.execute(new CreateVideoCommand(data));
  }
}
