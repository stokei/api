import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveClassroomsStudentCommand } from '@/commands/implements/classrooms-students/remove-classrooms-student.command';
import { RemoveClassroomsStudentDTO } from '@/dtos/classrooms-students/remove-classrooms-student.dto';
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

@Injectable()
export class RemoveClassroomsStudentService
  implements
    IBaseService<RemoveClassroomsStudentDTO, Promise<ClassroomsStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveClassroomsStudentDTO
  ): Promise<ClassroomsStudentModel> {
    return await this.commandBus.execute(
      new RemoveClassroomsStudentCommand(data)
    );
  }
}
