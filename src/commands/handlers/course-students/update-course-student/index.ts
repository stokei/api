import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCourseStudentCommand } from '@/commands/implements/course-students/update-course-student.command';
import {
  CourseStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCourseStudentByIdRepository } from '@/repositories/course-students/find-course-student-by-id';
import { UpdateCourseStudentRepository } from '@/repositories/course-students/update-course-student';

type UpdateCourseStudentCommandKeys = keyof UpdateCourseStudentCommand;

@CommandHandler(UpdateCourseStudentCommand)
export class UpdateCourseStudentCommandHandler
  implements ICommandHandler<UpdateCourseStudentCommand>
{
  constructor(
    private readonly findCourseStudentByIdRepository: FindCourseStudentByIdRepository,
    private readonly updateCourseStudentRepository: UpdateCourseStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCourseStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const courseStudentId = splitServiceId(data.where?.courseStudentId)?.id;
    if (!courseStudentId) {
      throw new ParamNotFoundException('courseStudentId');
    }

    const courseStudent = await this.findCourseStudentByIdRepository.execute(
      courseStudentId
    );
    if (!courseStudent) {
      throw new CourseStudentNotFoundException();
    }

    const updated = await this.updateCourseStudentRepository.execute({
      ...data,
      where: {
        ...data.where,
        courseStudentId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const courseStudentUpdated =
      await this.findCourseStudentByIdRepository.execute(courseStudentId);
    if (!courseStudentUpdated) {
      throw new CourseStudentNotFoundException();
    }
    const courseStudentModel =
      this.publisher.mergeObjectContext(courseStudentUpdated);
    courseStudentModel.updatedCourseStudent({
      updatedBy: data.data.updatedBy
    });
    courseStudentModel.commit();

    return courseStudentUpdated;
  }

  private clearData(
    command: UpdateCourseStudentCommand
  ): UpdateCourseStudentCommand {
    return cleanObject({
      where: cleanObject({
        courseStudentId: cleanValue(command?.where?.courseStudentId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
