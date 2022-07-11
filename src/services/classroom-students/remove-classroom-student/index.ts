import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveClassroomStudentCommand } from '@/commands/implements/classroom-students/remove-classroom-student.command';
import { RemoveClassroomStudentDTO } from '@/dtos/classroom-students/remove-classroom-student.dto';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Injectable()
export class RemoveClassroomStudentService
  implements
    IBaseService<RemoveClassroomStudentDTO, Promise<ClassroomStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveClassroomStudentDTO
  ): Promise<ClassroomStudentModel> {
    return await this.commandBus.execute(
      new RemoveClassroomStudentCommand(data)
    );
  }
}
