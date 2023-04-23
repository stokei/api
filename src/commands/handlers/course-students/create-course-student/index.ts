import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCourseStudentCommand } from '@/commands/implements/course-students/create-course-student.command';
import {
  CourseStudentAlreadyExistsException,
  CourseStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCourseStudentRepository } from '@/repositories/course-students/create-course-student';
import { ExistsCourseStudentsRepository } from '@/repositories/course-students/exists-course-students';

type CreateCourseStudentCommandKeys = keyof CreateCourseStudentCommand;

@CommandHandler(CreateCourseStudentCommand)
export class CreateCourseStudentCommandHandler
  implements ICommandHandler<CreateCourseStudentCommand>
{
  constructor(
    private readonly createCourseStudentRepository: CreateCourseStudentRepository,
    private readonly existsCourseStudentsRepository: ExistsCourseStudentsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCourseStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.course) {
      throw new ParamNotFoundException<CreateCourseStudentCommandKeys>(
        'course'
      );
    }
    if (!data?.student) {
      throw new ParamNotFoundException<CreateCourseStudentCommandKeys>(
        'student'
      );
    }

    const existsCourseStudent =
      await this.existsCourseStudentsRepository.execute({
        where: {
          course: data.course,
          student: data.student
        }
      });
    if (existsCourseStudent) {
      throw new CourseStudentAlreadyExistsException();
    }

    const courseStudentCreated =
      await this.createCourseStudentRepository.execute(data);
    if (!courseStudentCreated) {
      throw new CourseStudentNotFoundException();
    }
    const courseStudentModel =
      this.publisher.mergeObjectContext(courseStudentCreated);
    courseStudentModel.createdCourseStudent({
      createdBy: data.createdBy
    });
    courseStudentModel.commit();

    return courseStudentCreated;
  }

  private clearData(
    command: CreateCourseStudentCommand
  ): CreateCourseStudentCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      student: cleanValue(command?.student),
      course: cleanValue(command?.course)
    });
  }
}
