import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateClassroomsStudentCommand } from '@/commands/implements/classrooms-students/update-classrooms-student.command';
import { UpdateClassroomsStudentDTO } from '@/dtos/classrooms-students/update-classrooms-student.dto';
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

@Injectable()
export class UpdateClassroomsStudentService
  implements
    IBaseService<UpdateClassroomsStudentDTO, Promise<ClassroomsStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateClassroomsStudentDTO
  ): Promise<ClassroomsStudentModel> {
    return await this.commandBus.execute(
      new UpdateClassroomsStudentCommand(data)
    );
  }
}
