import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCourseStudentCommand } from '@/commands/implements/course-students/create-course-student.command';
import {
  CourseStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCourseStudentRepository } from '@/repositories/course-students/create-course-student';

type CreateCourseStudentCommandKeys = keyof CreateCourseStudentCommand;

@CommandHandler(CreateCourseStudentCommand)
export class CreateCourseStudentCommandHandler
  implements ICommandHandler<CreateCourseStudentCommand>
{
  constructor(
    private readonly createCourseStudentRepository: CreateCourseStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCourseStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCourseStudentCommandKeys>(
        'parent'
      );
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
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
