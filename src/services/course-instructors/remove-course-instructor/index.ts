import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveCourseInstructorCommand } from '@/commands/implements/course-instructors/remove-course-instructor.command';
import { RemoveCourseInstructorDTO } from '@/dtos/course-instructors/remove-course-instructor.dto';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Injectable()
export class RemoveCourseInstructorService
  implements
    IBaseService<RemoveCourseInstructorDTO, Promise<CourseInstructorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveCourseInstructorDTO
  ): Promise<CourseInstructorModel> {
    return await this.commandBus.execute(
      new RemoveCourseInstructorCommand(data)
    );
  }
}
