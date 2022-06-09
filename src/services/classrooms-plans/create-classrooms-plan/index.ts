import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateClassroomsPlanCommand } from '@/commands/implements/classrooms-plans/create-classrooms-plan.command';
import { CreateClassroomsPlanDTO } from '@/dtos/classrooms-plans/create-classrooms-plan.dto';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';

@Injectable()
export class CreateClassroomsPlanService
  implements
    IBaseService<CreateClassroomsPlanDTO, Promise<ClassroomsPlanModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateClassroomsPlanDTO): Promise<ClassroomsPlanModel> {
    return await this.commandBus.execute(new CreateClassroomsPlanCommand(data));
  }
}
