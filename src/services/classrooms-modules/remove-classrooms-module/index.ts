import { RemoveClassroomsModuleCommand } from '@/commands/implements/classrooms-modules/remove-classrooms-module.command';
import { RemoveClassroomsModuleDTO } from '@/dtos/classrooms-modules/remove-classrooms-module.dto';
import { ClassroomsModuleModel } from '@/models/classrooms-module.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveClassroomsModuleService
  implements
    IBaseService<RemoveClassroomsModuleDTO, Promise<ClassroomsModuleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveClassroomsModuleDTO
  ): Promise<ClassroomsModuleModel> {
    return await this.commandBus.execute(
      new RemoveClassroomsModuleCommand(data)
    );
  }
}
