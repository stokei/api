import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveClassroomsModuleCommand } from '@/commands/implements/classrooms-modules/remove-classrooms-module.command';
import {
  ClassroomsModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsModuleByIdRepository } from '@/repositories/classrooms-modules/find-classrooms-module-by-id';
import { RemoveClassroomsModuleRepository } from '@/repositories/classrooms-modules/remove-classrooms-module';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveClassroomsModuleCommandKeys = keyof RemoveClassroomsModuleCommand;

@CommandHandler(RemoveClassroomsModuleCommand)
export class RemoveClassroomsModuleCommandHandler
  implements ICommandHandler<RemoveClassroomsModuleCommand>
{
  constructor(
    private readonly findClassroomsModuleByIdRepository: FindClassroomsModuleByIdRepository,
    private readonly removeClassroomsModuleRepository: RemoveClassroomsModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomsModuleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomsModuleId = splitServiceId(
      data.where?.classroomsModuleId
    )?.id;
    if (!classroomsModuleId) {
      throw new ParamNotFoundException('classroomsModuleId');
    }

    const classroomsModule =
      await this.findClassroomsModuleByIdRepository.execute(classroomsModuleId);
    if (!classroomsModule) {
      throw new ClassroomsModuleNotFoundException();
    }

    const removed = await this.removeClassroomsModuleRepository.execute({
      where: {
        classroomsModuleId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomsModuleModel =
      this.publisher.mergeObjectContext(classroomsModule);
    classroomsModuleModel.removedClassroomsModule();
    classroomsModuleModel.commit();

    return classroomsModule;
  }

  private clearData(
    command: RemoveClassroomsModuleCommand
  ): RemoveClassroomsModuleCommand {
    return cleanObject({
      where: cleanObject({
        classroomsModuleId: cleanValue(command?.where?.classroomsModuleId)
      })
    });
  }
}
