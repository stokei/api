import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateClassroomCommand } from '@/commands/implements/classrooms/update-classroom.command';
import { UpdateClassroomDTO } from '@/dtos/classrooms/update-classroom.dto';
import { ClassroomModel } from '@/models/classroom.model';

@Injectable()
export class UpdateClassroomService
  implements IBaseService<UpdateClassroomDTO, Promise<ClassroomModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateClassroomDTO): Promise<ClassroomModel> {
    return await this.commandBus.execute(new UpdateClassroomCommand(data));
  }
}
