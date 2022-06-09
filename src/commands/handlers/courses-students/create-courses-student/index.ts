import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCoursesStudentCommand } from '@/commands/implements/courses-students/create-courses-student.command';
import {
  CoursesStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCoursesStudentRepository } from '@/repositories/courses-students/create-courses-student';

type CreateCoursesStudentCommandKeys = keyof CreateCoursesStudentCommand;

@CommandHandler(CreateCoursesStudentCommand)
export class CreateCoursesStudentCommandHandler
  implements ICommandHandler<CreateCoursesStudentCommand>
{
  constructor(
    private readonly createCoursesStudentRepository: CreateCoursesStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCoursesStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCoursesStudentCommandKeys>(
        'parent'
      );
    }

    const coursesStudentCreated =
      await this.createCoursesStudentRepository.execute(data);
    if (!coursesStudentCreated) {
      throw new CoursesStudentNotFoundException();
    }
    const coursesStudentModel = this.publisher.mergeObjectContext(
      coursesStudentCreated
    );
    coursesStudentModel.createdCoursesStudent();
    coursesStudentModel.commit();

    return coursesStudentCreated;
  }

  private clearData(
    command: CreateCoursesStudentCommand
  ): CreateCoursesStudentCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
