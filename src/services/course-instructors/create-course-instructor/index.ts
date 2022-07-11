import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCourseInstructorCommand } from '@/commands/implements/course-instructors/create-course-instructor.command';
import { CreateCourseInstructorDTO } from '@/dtos/course-instructors/create-course-instructor.dto';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Injectable()
export class CreateCourseInstructorService
  implements
    IBaseService<CreateCourseInstructorDTO, Promise<CourseInstructorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateCourseInstructorDTO
  ): Promise<CourseInstructorModel> {
    return await this.commandBus.execute(
      new CreateCourseInstructorCommand(data)
    );
  }
}
