import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveClassroomsPlanCommand } from '@/commands/implements/classrooms-plans/remove-classrooms-plan.command';
import { RemoveClassroomsPlanDTO } from '@/dtos/classrooms-plans/remove-classrooms-plan.dto';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';

@Injectable()
export class RemoveClassroomsPlanService
  implements
    IBaseService<RemoveClassroomsPlanDTO, Promise<ClassroomsPlanModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveClassroomsPlanDTO): Promise<ClassroomsPlanModel> {
    return await this.commandBus.execute(new RemoveClassroomsPlanCommand(data));
  }
}
