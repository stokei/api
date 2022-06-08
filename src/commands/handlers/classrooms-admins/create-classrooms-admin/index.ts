import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateClassroomsAdminCommand } from '@/commands/implements/classrooms-admins/create-classrooms-admin.command';
import {
  ClassroomsAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomsAdminRepository } from '@/repositories/classrooms-admins/create-classrooms-admin';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateClassroomsAdminCommandKeys = keyof CreateClassroomsAdminCommand;

@CommandHandler(CreateClassroomsAdminCommand)
export class CreateClassroomsAdminCommandHandler
  implements ICommandHandler<CreateClassroomsAdminCommand>
{
  constructor(
    private readonly createClassroomsAdminRepository: CreateClassroomsAdminRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomsAdminCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomsAdminCommandKeys>(
        'parent'
      );
    }

    const classroomsAdminCreated =
      await this.createClassroomsAdminRepository.execute(data);
    if (!classroomsAdminCreated) {
      throw new ClassroomsAdminNotFoundException();
    }
    const classroomsAdminModel = this.publisher.mergeObjectContext(
      classroomsAdminCreated
    );
    classroomsAdminModel.createdClassroomsAdmin();
    classroomsAdminModel.commit();

    return classroomsAdminCreated;
  }

  private clearData(
    command: CreateClassroomsAdminCommand
  ): CreateClassroomsAdminCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
