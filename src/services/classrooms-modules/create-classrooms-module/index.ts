import { CreateClassroomsModuleCommand } from '@/commands/implements/classrooms-modules/create-classrooms-module.command';
import { CreateClassroomsModuleDTO } from '@/dtos/classrooms-modules/create-classrooms-module.dto';
import { ClassroomsModuleModel } from '@/models/classrooms-module.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateClassroomsModuleService
  implements
    IBaseService<CreateClassroomsModuleDTO, Promise<ClassroomsModuleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateClassroomsModuleDTO
  ): Promise<ClassroomsModuleModel> {
    return await this.commandBus.execute(
      new CreateClassroomsModuleCommand(data)
    );
  }
}
