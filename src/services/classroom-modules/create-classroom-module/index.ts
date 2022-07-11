import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateClassroomModuleCommand } from '@/commands/implements/classroom-module s/create-classroom-module .command';
import { CreateClassroomModuleDTO } from '@/dtos/classroom-module s/create-classroom-module .dto';
import { ClassroomModuleModel } from '@/models/classroom-module .model';

@Injectable()
export class CreateClassroomModuleService
  implements
    IBaseService<CreateClassroomModuleDTO, Promise<ClassroomModuleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateClassroomModuleDTO): Promise<ClassroomModuleModel> {
    return await this.commandBus.execute(
      new CreateClassroomModuleCommand(data)
    );
  }
}
