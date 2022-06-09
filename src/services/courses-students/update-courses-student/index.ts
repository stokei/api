import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCoursesStudentCommand } from '@/commands/implements/courses-students/update-courses-student.command';
import { UpdateCoursesStudentDTO } from '@/dtos/courses-students/update-courses-student.dto';
import { CoursesStudentModel } from '@/models/courses-student.model';

@Injectable()
export class UpdateCoursesStudentService
  implements
    IBaseService<UpdateCoursesStudentDTO, Promise<CoursesStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCoursesStudentDTO): Promise<CoursesStudentModel> {
    return await this.commandBus.execute(new UpdateCoursesStudentCommand(data));
  }
}
