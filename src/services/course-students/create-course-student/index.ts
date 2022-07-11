import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCourseStudentCommand } from '@/commands/implements/course-students/create-course-student.command';
import { CreateCourseStudentDTO } from '@/dtos/course-students/create-course-student.dto';
import { CourseStudentModel } from '@/models/course-student.model';

@Injectable()
export class CreateCourseStudentService
  implements IBaseService<CreateCourseStudentDTO, Promise<CourseStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCourseStudentDTO): Promise<CourseStudentModel> {
    return await this.commandBus.execute(new CreateCourseStudentCommand(data));
  }
}
