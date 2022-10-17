import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateOrFindCourseStudentCommand } from '@/commands/implements/course-students/create-or-find-course-student.command';
import { CreateOrFindCourseStudentDTO } from '@/dtos/course-students/create-or-find-course-student.dto';
import { CourseStudentModel } from '@/models/course-student.model';

@Injectable()
export class CreateOrFindCourseStudentService
  implements
    IBaseService<CreateOrFindCourseStudentDTO, Promise<CourseStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateOrFindCourseStudentDTO
  ): Promise<CourseStudentModel> {
    return await this.commandBus.execute(
      new CreateOrFindCourseStudentCommand(data)
    );
  }
}
