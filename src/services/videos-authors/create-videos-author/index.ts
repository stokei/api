import { CreateVideosAuthorCommand } from '@/commands/implements/videos-authors/create-videos-author.command';
import { CreateVideosAuthorDTO } from '@/dtos/videos-authors/create-videos-author.dto';
import { VideosAuthorModel } from '@/models/videos-author.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateVideosAuthorService
  implements IBaseService<CreateVideosAuthorDTO, Promise<VideosAuthorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateVideosAuthorDTO): Promise<VideosAuthorModel> {
    return await this.commandBus.execute(new CreateVideosAuthorCommand(data));
  }
}
