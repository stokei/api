import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateClassroomsModuleCommand } from '@/commands/implements/classrooms-modules/create-classrooms-module.command';
import {
  ClassroomsModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomsModuleRepository } from '@/repositories/classrooms-modules/create-classrooms-module';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateClassroomsModuleCommandKeys = keyof CreateClassroomsModuleCommand;

@CommandHandler(CreateClassroomsModuleCommand)
export class CreateClassroomsModuleCommandHandler
  implements ICommandHandler<CreateClassroomsModuleCommand>
{
  constructor(
    private readonly createClassroomsModuleRepository: CreateClassroomsModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomsModuleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomsModuleCommandKeys>(
        'parent'
      );
    }

    const classroomsModuleCreated =
      await this.createClassroomsModuleRepository.execute(data);
    if (!classroomsModuleCreated) {
      throw new ClassroomsModuleNotFoundException();
    }
    const classroomsModuleModel = this.publisher.mergeObjectContext(
      classroomsModuleCreated
    );
    classroomsModuleModel.createdClassroomsModule();
    classroomsModuleModel.commit();

    return classroomsModuleCreated;
  }

  private clearData(
    command: CreateClassroomsModuleCommand
  ): CreateClassroomsModuleCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
