import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateClassroomsModuleCommand } from '@/commands/implements/classrooms-modules/update-classrooms-module.command';
import { UpdateClassroomsModuleDTO } from '@/dtos/classrooms-modules/update-classrooms-module.dto';
import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

@Injectable()
export class UpdateClassroomsModuleService
  implements
    IBaseService<UpdateClassroomsModuleDTO, Promise<ClassroomsModuleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateClassroomsModuleDTO
  ): Promise<ClassroomsModuleModel> {
    return await this.commandBus.execute(
      new UpdateClassroomsModuleCommand(data)
    );
  }
}
