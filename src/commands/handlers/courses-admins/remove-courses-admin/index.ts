import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCoursesAdminCommand } from '@/commands/implements/courses-admins/remove-courses-admin.command';
import {
  CoursesAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCoursesAdminByIdRepository } from '@/repositories/courses-admins/find-courses-admin-by-id';
import { RemoveCoursesAdminRepository } from '@/repositories/courses-admins/remove-courses-admin';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveCoursesAdminCommandKeys = keyof RemoveCoursesAdminCommand;

@CommandHandler(RemoveCoursesAdminCommand)
export class RemoveCoursesAdminCommandHandler
  implements ICommandHandler<RemoveCoursesAdminCommand>
{
  constructor(
    private readonly findCoursesAdminByIdRepository: FindCoursesAdminByIdRepository,
    private readonly removeCoursesAdminRepository: RemoveCoursesAdminRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCoursesAdminCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const coursesAdminId = splitServiceId(data.where?.coursesAdminId)?.id;
    if (!coursesAdminId) {
      throw new ParamNotFoundException('coursesAdminId');
    }

    const coursesAdmin = await this.findCoursesAdminByIdRepository.execute(
      coursesAdminId
    );
    if (!coursesAdmin) {
      throw new CoursesAdminNotFoundException();
    }

    const removed = await this.removeCoursesAdminRepository.execute({
      where: {
        coursesAdminId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const coursesAdminModel = this.publisher.mergeObjectContext(coursesAdmin);
    coursesAdminModel.removedCoursesAdmin();
    coursesAdminModel.commit();

    return coursesAdmin;
  }

  private clearData(
    command: RemoveCoursesAdminCommand
  ): RemoveCoursesAdminCommand {
    return cleanObject({
      where: cleanObject({
        coursesAdminId: cleanValue(command?.where?.coursesAdminId)
      })
    });
  }
}
