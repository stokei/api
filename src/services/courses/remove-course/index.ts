import { RemoveCourseCommand } from '@/commands/implements/courses/remove-course.command';
import { RemoveCourseDTO } from '@/dtos/courses/remove-course.dto';
import { CourseModel } from '@/models/course.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveCourseService
  implements IBaseService<RemoveCourseDTO, Promise<CourseModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCourseDTO): Promise<CourseModel> {
    return await this.commandBus.execute(new RemoveCourseCommand(data));
  }
}
