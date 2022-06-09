import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveClassroomsAdminCommand } from '@/commands/implements/classrooms-admins/remove-classrooms-admin.command';
import {
  ClassroomsAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsAdminByIdRepository } from '@/repositories/classrooms-admins/find-classrooms-admin-by-id';
import { RemoveClassroomsAdminRepository } from '@/repositories/classrooms-admins/remove-classrooms-admin';

type RemoveClassroomsAdminCommandKeys = keyof RemoveClassroomsAdminCommand;

@CommandHandler(RemoveClassroomsAdminCommand)
export class RemoveClassroomsAdminCommandHandler
  implements ICommandHandler<RemoveClassroomsAdminCommand>
{
  constructor(
    private readonly findClassroomsAdminByIdRepository: FindClassroomsAdminByIdRepository,
    private readonly removeClassroomsAdminRepository: RemoveClassroomsAdminRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomsAdminCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomsAdminId = splitServiceId(data.where?.classroomsAdminId)?.id;
    if (!classroomsAdminId) {
      throw new ParamNotFoundException('classroomsAdminId');
    }

    const classroomsAdmin =
      await this.findClassroomsAdminByIdRepository.execute(classroomsAdminId);
    if (!classroomsAdmin) {
      throw new ClassroomsAdminNotFoundException();
    }

    const removed = await this.removeClassroomsAdminRepository.execute({
      where: {
        classroomsAdminId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomsAdminModel =
      this.publisher.mergeObjectContext(classroomsAdmin);
    classroomsAdminModel.removedClassroomsAdmin();
    classroomsAdminModel.commit();

    return classroomsAdmin;
  }

  private clearData(
    command: RemoveClassroomsAdminCommand
  ): RemoveClassroomsAdminCommand {
    return cleanObject({
      where: cleanObject({
        classroomsAdminId: cleanValue(command?.where?.classroomsAdminId)
      })
    });
  }
}
