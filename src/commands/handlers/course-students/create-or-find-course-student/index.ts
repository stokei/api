import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateOrFindCourseStudentCommand } from '@/commands/implements/course-students/create-or-find-course-student.command';
import {
  CourseStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CourseStudentModel } from '@/models/course-student.model';
import { CreateCourseStudentService } from '@/services/course-students/create-course-student';
import { FindCourseStudentByCourseAndStudentService } from '@/services/course-students/find-course-student-by-course-and-student';

type CreateOrFindCourseStudentCommandKeys =
  keyof CreateOrFindCourseStudentCommand;

@CommandHandler(CreateOrFindCourseStudentCommand)
export class CreateOrFindCourseStudentCommandHandler
  implements ICommandHandler<CreateOrFindCourseStudentCommand>
{
  constructor(
    private readonly createCourseStudentService: CreateCourseStudentService,
    private readonly findCourseStudentByCourseAndStudentService: FindCourseStudentByCourseAndStudentService
  ) {}

  async execute(command: CreateOrFindCourseStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.course) {
      throw new ParamNotFoundException<CreateOrFindCourseStudentCommandKeys>(
        'course'
      );
    }
    if (!data?.student) {
      throw new ParamNotFoundException<CreateOrFindCourseStudentCommandKeys>(
        'student'
      );
    }

    let courseStudent: CourseStudentModel;
    try {
      courseStudent =
        await this.findCourseStudentByCourseAndStudentService.execute({
          course: data.course,
          student: data.student
        });
      if (!courseStudent) {
        throw new CourseStudentNotFoundException();
      }
    } catch (error) {
      courseStudent = await this.createCourseStudentService.execute(data);
    }
    return courseStudent;
  }

  private clearData(
    command: CreateOrFindCourseStudentCommand
  ): CreateOrFindCourseStudentCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      student: cleanValue(command?.student),
      course: cleanValue(command?.course)
    });
  }
}
