import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveClassroomModuleCommand } from '@/commands/implements/classroom-module s/remove-classroom-module .command';
import { RemoveClassroomModuleDTO } from '@/dtos/classroom-module s/remove-classroom-module .dto';
import { ClassroomModuleModel } from '@/models/classroom-module .model';

@Injectable()
export class RemoveClassroomModuleService
  implements
    IBaseService<RemoveClassroomModuleDTO, Promise<ClassroomModuleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveClassroomModuleDTO): Promise<ClassroomModuleModel> {
    return await this.commandBus.execute(
      new RemoveClassroomModuleCommand(data)
    );
  }
}
