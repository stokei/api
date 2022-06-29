import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCoursesStudentCommand } from '@/commands/implements/courses-students/update-courses-student.command';
import {
  CoursesStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCoursesStudentByIdRepository } from '@/repositories/courses-students/find-courses-student-by-id';
import { UpdateCoursesStudentRepository } from '@/repositories/courses-students/update-courses-student';

type UpdateCoursesStudentCommandKeys = keyof UpdateCoursesStudentCommand;

@CommandHandler(UpdateCoursesStudentCommand)
export class UpdateCoursesStudentCommandHandler
  implements ICommandHandler<UpdateCoursesStudentCommand>
{
  constructor(
    private readonly findCoursesStudentByIdRepository: FindCoursesStudentByIdRepository,
    private readonly updateCoursesStudentRepository: UpdateCoursesStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCoursesStudentCommand) {
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

    const updated = await this.updateCoursesStudentRepository.execute({
      ...data,
      where: {
        ...data.where,
        coursesStudentId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const coursesStudentUpdated =
      await this.findCoursesStudentByIdRepository.execute(coursesStudentId);
    if (!coursesStudentUpdated) {
      throw new CoursesStudentNotFoundException();
    }
    const coursesStudentModel = this.publisher.mergeObjectContext(
      coursesStudentUpdated
    );
    coursesStudentModel.updatedCoursesStudent();
    coursesStudentModel.commit();

    return coursesStudentUpdated;
  }

  private clearData(
    command: UpdateCoursesStudentCommand
  ): UpdateCoursesStudentCommand {
    return cleanObject({
      where: cleanObject({
        coursesStudentId: cleanValue(command?.where?.coursesStudentId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
