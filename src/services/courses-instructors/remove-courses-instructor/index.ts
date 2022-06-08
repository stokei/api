import { RemoveCoursesInstructorCommand } from '@/commands/implements/courses-instructors/remove-courses-instructor.command';
import { RemoveCoursesInstructorDTO } from '@/dtos/courses-instructors/remove-courses-instructor.dto';
import { CoursesInstructorModel } from '@/models/courses-instructor.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveCoursesInstructorService
  implements
    IBaseService<RemoveCoursesInstructorDTO, Promise<CoursesInstructorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveCoursesInstructorDTO
  ): Promise<CoursesInstructorModel> {
    return await this.commandBus.execute(
      new RemoveCoursesInstructorCommand(data)
    );
  }
}
