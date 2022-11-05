import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveAppInstructorCommand } from '@/commands/implements/app-instructors/remove-app-instructor.command';
import {
  AppInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAllAppInstructorsRepository } from '@/repositories/app-instructors/find-all-app-instructors';
import { RemoveAppInstructorRepository } from '@/repositories/app-instructors/remove-app-instructor';

@CommandHandler(RemoveAppInstructorCommand)
export class RemoveAppInstructorCommandHandler
  implements ICommandHandler<RemoveAppInstructorCommand>
{
  constructor(
    private readonly findAllAppInstructorsRepository: FindAllAppInstructorsRepository,
    private readonly removeAppInstructorRepository: RemoveAppInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveAppInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const { app, instructor } = data.where || {};
    if (!app) {
      throw new ParamNotFoundException('appId');
    }
    if (!instructor) {
      throw new ParamNotFoundException('instructorId');
    }

    const appInstructors = await this.findAllAppInstructorsRepository.execute({
      where: {
        AND: {
          app: {
            equals: app
          },
          instructor: {
            equals: instructor
          }
        }
      }
    });
    if (!appInstructors?.length) {
      throw new AppInstructorNotFoundException();
    }
    const appInstructor = appInstructors[0];
    const removed = await this.removeAppInstructorRepository.execute({
      where: {
        ...data.where,
        app,
        instructor
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const appInstructorModel = this.publisher.mergeObjectContext(appInstructor);
    appInstructorModel.removedAppInstructor({
      removedBy: data.where.removedBy
    });
    appInstructorModel.commit();

    return appInstructor;
  }

  private clearData(
    command: RemoveAppInstructorCommand
  ): RemoveAppInstructorCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        instructor: cleanValue(command?.where?.instructor)
      })
    });
  }
}
