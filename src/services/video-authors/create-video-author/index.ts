import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateVideoAuthorCommand } from '@/commands/implements/video-authors/create-video-author.command';
import { CreateVideoAuthorDTO } from '@/dtos/video-authors/create-video-author.dto';
import { VideoAuthorModel } from '@/models/video-author.model';

@Injectable()
export class CreateVideoAuthorService
  implements IBaseService<CreateVideoAuthorDTO, Promise<VideoAuthorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateVideoAuthorDTO): Promise<VideoAuthorModel> {
    return await this.commandBus.execute(new CreateVideoAuthorCommand(data));
  }
}
