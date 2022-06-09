import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCoursesInstructorCommand } from '@/commands/implements/courses-instructors/create-courses-instructor.command';
import { CreateCoursesInstructorDTO } from '@/dtos/courses-instructors/create-courses-instructor.dto';
import { CoursesInstructorModel } from '@/models/courses-instructor.model';

@Injectable()
export class CreateCoursesInstructorService
  implements
    IBaseService<CreateCoursesInstructorDTO, Promise<CoursesInstructorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateCoursesInstructorDTO
  ): Promise<CoursesInstructorModel> {
    return await this.commandBus.execute(
      new CreateCoursesInstructorCommand(data)
    );
  }
}
