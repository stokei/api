import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateClassroomStudentCommand } from '@/commands/implements/classroom-students/update-classroom-student.command';
import { UpdateClassroomStudentDTO } from '@/dtos/classroom-students/update-classroom-student.dto';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Injectable()
export class UpdateClassroomStudentService
  implements
    IBaseService<UpdateClassroomStudentDTO, Promise<ClassroomStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateClassroomStudentDTO
  ): Promise<ClassroomStudentModel> {
    return await this.commandBus.execute(
      new UpdateClassroomStudentCommand(data)
    );
  }
}
