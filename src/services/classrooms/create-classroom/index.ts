import { CreateClassroomCommand } from '@/commands/implements/classrooms/create-classroom.command';
import { CreateClassroomDTO } from '@/dtos/classrooms/create-classroom.dto';
import { ClassroomModel } from '@/models/classroom.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateClassroomService
  implements IBaseService<CreateClassroomDTO, Promise<ClassroomModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateClassroomDTO): Promise<ClassroomModel> {
    return await this.commandBus.execute(new CreateClassroomCommand(data));
  }
}
