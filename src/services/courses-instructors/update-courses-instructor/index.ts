import { UpdateCoursesInstructorCommand } from '@/commands/implements/courses-instructors/update-courses-instructor.command';
import { UpdateCoursesInstructorDTO } from '@/dtos/courses-instructors/update-courses-instructor.dto';
import { CoursesInstructorModel } from '@/models/courses-instructor.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateCoursesInstructorService
  implements
    IBaseService<UpdateCoursesInstructorDTO, Promise<CoursesInstructorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateCoursesInstructorDTO
  ): Promise<CoursesInstructorModel> {
    return await this.commandBus.execute(
      new UpdateCoursesInstructorCommand(data)
    );
  }
}
