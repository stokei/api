import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCoursesStudentCommand } from '@/commands/implements/courses-students/remove-courses-student.command';
import {
  CoursesStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCoursesStudentByIdRepository } from '@/repositories/courses-students/find-courses-student-by-id';
import { RemoveCoursesStudentRepository } from '@/repositories/courses-students/remove-courses-student';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveCoursesStudentCommandKeys = keyof RemoveCoursesStudentCommand;

@CommandHandler(RemoveCoursesStudentCommand)
export class RemoveCoursesStudentCommandHandler
  implements ICommandHandler<RemoveCoursesStudentCommand>
{
  constructor(
    private readonly findCoursesStudentByIdRepository: FindCoursesStudentByIdRepository,
    private readonly removeCoursesStudentRepository: RemoveCoursesStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCoursesStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const coursesStudentId = splitServiceId(data.where?.coursesStudentId)?.id;
    if (!coursesStudentId) {
      throw new ParamNotFoundException('coursesStudentId');
    }

    const coursesStudent = await this.findCoursesStudentByIdRepository.execute(
      coursesStudentId
    );
    if (!coursesStudent) {
      throw new CoursesStudentNotFoundException();
    }

    const removed = await this.removeCoursesStudentRepository.execute({
      where: {
        coursesStudentId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const coursesStudentModel =
      this.publisher.mergeObjectContext(coursesStudent);
    coursesStudentModel.removedCoursesStudent();
    coursesStudentModel.commit();

    return coursesStudent;
  }

  private clearData(
    command: RemoveCoursesStudentCommand
  ): RemoveCoursesStudentCommand {
    return cleanObject({
      where: cleanObject({
        coursesStudentId: cleanValue(command?.where?.coursesStudentId)
      })
    });
  }
}
