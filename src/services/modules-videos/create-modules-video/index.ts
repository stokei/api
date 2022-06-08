import { CreateModulesVideoCommand } from '@/commands/implements/modules-videos/create-modules-video.command';
import { CreateModulesVideoDTO } from '@/dtos/modules-videos/create-modules-video.dto';
import { ModulesVideoModel } from '@/models/modules-video.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateModulesVideoService
  implements IBaseService<CreateModulesVideoDTO, Promise<ModulesVideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateModulesVideoDTO): Promise<ModulesVideoModel> {
    return await this.commandBus.execute(new CreateModulesVideoCommand(data));
  }
}
