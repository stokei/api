import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { DeactivateClassroomCommand } from '@/commands/implements/classrooms/deactivate-classroom.command';
import { DeactivateClassroomDTO } from '@/dtos/classrooms/deactivate-classroom.dto';
import { ClassroomModel } from '@/models/classroom.model';

@Injectable()
export class DeactivateClassroomService
  implements IBaseService<DeactivateClassroomDTO, Promise<ClassroomModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: DeactivateClassroomDTO): Promise<ClassroomModel> {
    return await this.commandBus.execute(new DeactivateClassroomCommand(data));
  }
}
