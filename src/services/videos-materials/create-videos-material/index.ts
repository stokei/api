import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateVideosMaterialCommand } from '@/commands/implements/videos-materials/create-videos-material.command';
import { CreateVideosMaterialDTO } from '@/dtos/videos-materials/create-videos-material.dto';
import { VideosMaterialModel } from '@/models/videos-material.model';

@Injectable()
export class CreateVideosMaterialService
  implements
    IBaseService<CreateVideosMaterialDTO, Promise<VideosMaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateVideosMaterialDTO): Promise<VideosMaterialModel> {
    return await this.commandBus.execute(new CreateVideosMaterialCommand(data));
  }
}
