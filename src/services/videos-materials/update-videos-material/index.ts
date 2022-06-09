import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateVideosMaterialCommand } from '@/commands/implements/videos-materials/update-videos-material.command';
import { UpdateVideosMaterialDTO } from '@/dtos/videos-materials/update-videos-material.dto';
import { VideosMaterialModel } from '@/models/videos-material.model';

@Injectable()
export class UpdateVideosMaterialService
  implements
    IBaseService<UpdateVideosMaterialDTO, Promise<VideosMaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateVideosMaterialDTO): Promise<VideosMaterialModel> {
    return await this.commandBus.execute(new UpdateVideosMaterialCommand(data));
  }
}
