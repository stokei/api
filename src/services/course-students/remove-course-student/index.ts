import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveCourseStudentCommand } from '@/commands/implements/course-students/remove-course-student.command';
import { RemoveCourseStudentDTO } from '@/dtos/course-students/remove-course-student.dto';
import { CourseStudentModel } from '@/models/course-student.model';

@Injectable()
export class RemoveCourseStudentService
  implements IBaseService<RemoveCourseStudentDTO, Promise<CourseStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCourseStudentDTO): Promise<CourseStudentModel> {
    return await this.commandBus.execute(new RemoveCourseStudentCommand(data));
  }
}
