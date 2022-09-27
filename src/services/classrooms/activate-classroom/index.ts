import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ActivateClassroomCommand } from '@/commands/implements/classrooms/activate-classroom.command';
import { ActivateClassroomDTO } from '@/dtos/classrooms/activate-classroom.dto';
import { ClassroomModel } from '@/models/classroom.model';

@Injectable()
export class ActivateClassroomService
  implements IBaseService<ActivateClassroomDTO, Promise<ClassroomModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ActivateClassroomDTO): Promise<ClassroomModel> {
    return await this.commandBus.execute(new ActivateClassroomCommand(data));
  }
}
