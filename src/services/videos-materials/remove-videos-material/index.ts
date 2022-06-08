import { RemoveVideosMaterialCommand } from '@/commands/implements/videos-materials/remove-videos-material.command';
import { RemoveVideosMaterialDTO } from '@/dtos/videos-materials/remove-videos-material.dto';
import { VideosMaterialModel } from '@/models/videos-material.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveVideosMaterialService
  implements
    IBaseService<RemoveVideosMaterialDTO, Promise<VideosMaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveVideosMaterialDTO): Promise<VideosMaterialModel> {
    return await this.commandBus.execute(new RemoveVideosMaterialCommand(data));
  }
}
