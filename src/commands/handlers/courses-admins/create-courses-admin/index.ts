import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateCoursesAdminCommand } from '@/commands/implements/courses-admins/create-courses-admin.command';
import {
  CoursesAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCoursesAdminRepository } from '@/repositories/courses-admins/create-courses-admin';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateCoursesAdminCommandKeys = keyof CreateCoursesAdminCommand;

@CommandHandler(CreateCoursesAdminCommand)
export class CreateCoursesAdminCommandHandler
  implements ICommandHandler<CreateCoursesAdminCommand>
{
  constructor(
    private readonly createCoursesAdminRepository: CreateCoursesAdminRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCoursesAdminCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCoursesAdminCommandKeys>('parent');
    }

    const coursesAdminCreated = await this.createCoursesAdminRepository.execute(
      data
    );
    if (!coursesAdminCreated) {
      throw new CoursesAdminNotFoundException();
    }
    const coursesAdminModel =
      this.publisher.mergeObjectContext(coursesAdminCreated);
    coursesAdminModel.createdCoursesAdmin();
    coursesAdminModel.commit();

    return coursesAdminCreated;
  }

  private clearData(
    command: CreateCoursesAdminCommand
  ): CreateCoursesAdminCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
