import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppInstructorCommand } from '@/commands/implements/app-instructors/create-app-instructor.command';
import {
  AccountAlreadyExistsException,
  AppInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAppInstructorRepository } from '@/repositories/app-instructors/create-app-instructor';
import { ExistsAppInstructorsRepository } from '@/repositories/app-instructors/exists-app-instructors';

type CreateAppInstructorCommandKeys = keyof CreateAppInstructorCommand;

@CommandHandler(CreateAppInstructorCommand)
export class CreateAppInstructorCommandHandler
  implements ICommandHandler<CreateAppInstructorCommand>
{
  constructor(
    private readonly createAppInstructorRepository: CreateAppInstructorRepository,
    private readonly existsAppInstructorsRepository: ExistsAppInstructorsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateAppInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateAppInstructorCommandKeys>('app');
    }
    if (!data?.instructor) {
      throw new ParamNotFoundException<CreateAppInstructorCommandKeys>(
        'instructor'
      );
    }
    const existsAppInstructor =
      await this.existsAppInstructorsRepository.execute({
        where: {
          instructor: data.instructor,
          app: data.app
        }
      });
    if (existsAppInstructor) {
      throw new AccountAlreadyExistsException();
    }

    const appInstructorCreated =
      await this.createAppInstructorRepository.execute(data);
    if (!appInstructorCreated) {
      throw new AppInstructorNotFoundException();
    }
    const appInstructorModel =
      this.publisher.mergeObjectContext(appInstructorCreated);
    appInstructorModel.createdAppInstructor({
      createdBy: data.createdBy
    });
    appInstructorModel.commit();

    return appInstructorCreated;
  }

  private clearData(
    command: CreateAppInstructorCommand
  ): CreateAppInstructorCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      instructor: cleanValue(command?.instructor)
    });
  }
}
