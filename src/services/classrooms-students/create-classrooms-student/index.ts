import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateClassroomsStudentCommand } from '@/commands/implements/classrooms-students/create-classrooms-student.command';
import { CreateClassroomsStudentDTO } from '@/dtos/classrooms-students/create-classrooms-student.dto';
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

@Injectable()
export class CreateClassroomsStudentService
  implements
    IBaseService<CreateClassroomsStudentDTO, Promise<ClassroomsStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateClassroomsStudentDTO
  ): Promise<ClassroomsStudentModel> {
    return await this.commandBus.execute(
      new CreateClassroomsStudentCommand(data)
    );
  }
}
