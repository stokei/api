import { RemoveClassroomCommand } from '@/commands/implements/classrooms/remove-classroom.command';
import { RemoveClassroomDTO } from '@/dtos/classrooms/remove-classroom.dto';
import { ClassroomModel } from '@/models/classroom.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveClassroomService
  implements IBaseService<RemoveClassroomDTO, Promise<ClassroomModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveClassroomDTO): Promise<ClassroomModel> {
    return await this.commandBus.execute(new RemoveClassroomCommand(data));
  }
}
