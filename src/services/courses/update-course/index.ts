import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCourseCommand } from '@/commands/implements/courses/update-course.command';
import { UpdateCourseDTO } from '@/dtos/courses/update-course.dto';
import { CourseModel } from '@/models/course.model';

@Injectable()
export class UpdateCourseService
  implements IBaseService<UpdateCourseDTO, Promise<CourseModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCourseDTO): Promise<CourseModel> {
    return await this.commandBus.execute(new UpdateCourseCommand(data));
  }
}
