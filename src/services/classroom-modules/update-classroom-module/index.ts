import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateClassroomModuleCommand } from '@/commands/implements/classroom-modules/update-classroom-module.command';
import { UpdateClassroomModuleDTO } from '@/dtos/classroom-modules/update-classroom-module.dto';
import { ClassroomModuleModel } from '@/models/classroom-module.model';

@Injectable()
export class UpdateClassroomModuleService
  implements
    IBaseService<UpdateClassroomModuleDTO, Promise<ClassroomModuleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateClassroomModuleDTO): Promise<ClassroomModuleModel> {
    return await this.commandBus.execute(
      new UpdateClassroomModuleCommand(data)
    );
  }
}
