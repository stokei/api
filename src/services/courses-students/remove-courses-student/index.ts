import { RemoveCoursesStudentCommand } from '@/commands/implements/courses-students/remove-courses-student.command';
import { RemoveCoursesStudentDTO } from '@/dtos/courses-students/remove-courses-student.dto';
import { CoursesStudentModel } from '@/models/courses-student.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveCoursesStudentService
  implements
    IBaseService<RemoveCoursesStudentDTO, Promise<CoursesStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCoursesStudentDTO): Promise<CoursesStudentModel> {
    return await this.commandBus.execute(new RemoveCoursesStudentCommand(data));
  }
}
