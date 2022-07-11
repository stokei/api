import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateClassroomStudentCommand } from '@/commands/implements/classroom-students/create-classroom-student.command';
import { CreateClassroomStudentDTO } from '@/dtos/classroom-students/create-classroom-student.dto';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Injectable()
export class CreateClassroomStudentService
  implements
    IBaseService<CreateClassroomStudentDTO, Promise<ClassroomStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateClassroomStudentDTO
  ): Promise<ClassroomStudentModel> {
    return await this.commandBus.execute(
      new CreateClassroomStudentCommand(data)
    );
  }
}
