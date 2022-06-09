import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCourseCommand } from '@/commands/implements/courses/create-course.command';
import { CreateCourseDTO } from '@/dtos/courses/create-course.dto';
import { CourseModel } from '@/models/course.model';

@Injectable()
export class CreateCourseService
  implements IBaseService<CreateCourseDTO, Promise<CourseModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCourseDTO): Promise<CourseModel> {
    return await this.commandBus.execute(new CreateCourseCommand(data));
  }
}
