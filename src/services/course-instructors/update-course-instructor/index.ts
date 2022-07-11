import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCourseInstructorCommand } from '@/commands/implements/course-instructors/update-course-instructor.command';
import { UpdateCourseInstructorDTO } from '@/dtos/course-instructors/update-course-instructor.dto';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Injectable()
export class UpdateCourseInstructorService
  implements
    IBaseService<UpdateCourseInstructorDTO, Promise<CourseInstructorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateCourseInstructorDTO
  ): Promise<CourseInstructorModel> {
    return await this.commandBus.execute(
      new UpdateCourseInstructorCommand(data)
    );
  }
}
