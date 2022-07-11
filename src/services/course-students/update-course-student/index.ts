import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCourseStudentCommand } from '@/commands/implements/course-students/update-course-student.command';
import { UpdateCourseStudentDTO } from '@/dtos/course-students/update-course-student.dto';
import { CourseStudentModel } from '@/models/course-student.model';

@Injectable()
export class UpdateCourseStudentService
  implements IBaseService<UpdateCourseStudentDTO, Promise<CourseStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCourseStudentDTO): Promise<CourseStudentModel> {
    return await this.commandBus.execute(new UpdateCourseStudentCommand(data));
  }
}
