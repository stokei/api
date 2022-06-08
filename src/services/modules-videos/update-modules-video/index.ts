import { UpdateModulesVideoCommand } from '@/commands/implements/modules-videos/update-modules-video.command';
import { UpdateModulesVideoDTO } from '@/dtos/modules-videos/update-modules-video.dto';
import { ModulesVideoModel } from '@/models/modules-video.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateModulesVideoService
  implements IBaseService<UpdateModulesVideoDTO, Promise<ModulesVideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateModulesVideoDTO): Promise<ModulesVideoModel> {
    return await this.commandBus.execute(new UpdateModulesVideoCommand(data));
  }
}
