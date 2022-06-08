import { UpdateClassroomsPlanCommand } from '@/commands/implements/classrooms-plans/update-classrooms-plan.command';
import { UpdateClassroomsPlanDTO } from '@/dtos/classrooms-plans/update-classrooms-plan.dto';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateClassroomsPlanService
  implements
    IBaseService<UpdateClassroomsPlanDTO, Promise<ClassroomsPlanModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateClassroomsPlanDTO): Promise<ClassroomsPlanModel> {
    return await this.commandBus.execute(new UpdateClassroomsPlanCommand(data));
  }
}
