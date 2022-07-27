import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveClassroomInstructorCommand } from '@/commands/implements/classroom-instructors/remove-classroom-instructor.command';
import {
  ClassroomInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAllClassroomInstructorsRepository } from '@/repositories/classroom-instructors/find-all-classroom-instructors';
import { RemoveClassroomInstructorRepository } from '@/repositories/classroom-instructors/remove-classroom-instructor';

@CommandHandler(RemoveClassroomInstructorCommand)
export class RemoveClassroomInstructorCommandHandler
  implements ICommandHandler<RemoveClassroomInstructorCommand>
{
  constructor(
    private readonly findAllClassroomInstructorsRepository: FindAllClassroomInstructorsRepository,
    private readonly removeClassroomInstructorRepository: RemoveClassroomInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const { classroom, instructor, app } = data.where || {};
    if (!classroom) {
      throw new ParamNotFoundException('classroomId');
    }
    if (!instructor) {
      throw new ParamNotFoundException('instructorId');
    }

    const classroomInstructors =
      await this.findAllClassroomInstructorsRepository.execute({
        where: {
          AND: {
            app: {
              equals: app
            },
            classroom: {
              equals: classroom
            },
            instructor: {
              equals: instructor
            }
          }
        }
      });
    if (!classroomInstructors?.length) {
      throw new ClassroomInstructorNotFoundException();
    }
    const classroomInstructor = classroomInstructors[0];
    const removed = await this.removeClassroomInstructorRepository.execute({
      where: {
        ...data.where,
        classroom,
        instructor
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomInstructorModel =
      this.publisher.mergeObjectContext(classroomInstructor);
    classroomInstructorModel.removedClassroomInstructor({
      removedBy: data.where.removedBy
    });
    classroomInstructorModel.commit();

    return classroomInstructor;
  }

  private clearData(
    command: RemoveClassroomInstructorCommand
  ): RemoveClassroomInstructorCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        classroom: cleanValue(command?.where?.classroom),
        instructor: cleanValue(command?.where?.instructor)
      })
    });
  }
}
