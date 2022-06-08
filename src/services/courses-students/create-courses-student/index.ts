import { CreateCoursesStudentCommand } from '@/commands/implements/courses-students/create-courses-student.command';
import { CreateCoursesStudentDTO } from '@/dtos/courses-students/create-courses-student.dto';
import { CoursesStudentModel } from '@/models/courses-student.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateCoursesStudentService
  implements
    IBaseService<CreateCoursesStudentDTO, Promise<CoursesStudentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCoursesStudentDTO): Promise<CoursesStudentModel> {
    return await this.commandBus.execute(new CreateCoursesStudentCommand(data));
  }
}
