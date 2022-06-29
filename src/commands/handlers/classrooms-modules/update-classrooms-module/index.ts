import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateClassroomsModuleCommand } from '@/commands/implements/classrooms-modules/update-classrooms-module.command';
import {
  ClassroomsModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsModuleByIdRepository } from '@/repositories/classrooms-modules/find-classrooms-module-by-id';
import { UpdateClassroomsModuleRepository } from '@/repositories/classrooms-modules/update-classrooms-module';

type UpdateClassroomsModuleCommandKeys = keyof UpdateClassroomsModuleCommand;

@CommandHandler(UpdateClassroomsModuleCommand)
export class UpdateClassroomsModuleCommandHandler
  implements ICommandHandler<UpdateClassroomsModuleCommand>
{
  constructor(
    private readonly findClassroomsModuleByIdRepository: FindClassroomsModuleByIdRepository,
    private readonly updateClassroomsModuleRepository: UpdateClassroomsModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomsModuleCommand) {
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

    const updated = await this.updateClassroomsModuleRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomsModuleId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomsModuleUpdated =
      await this.findClassroomsModuleByIdRepository.execute(classroomsModuleId);
    if (!classroomsModuleUpdated) {
      throw new ClassroomsModuleNotFoundException();
    }
    const classroomsModuleModel = this.publisher.mergeObjectContext(
      classroomsModuleUpdated
    );
    classroomsModuleModel.updatedClassroomsModule({
      updatedBy: data.data.updatedBy
    });
    classroomsModuleModel.commit();

    return classroomsModuleUpdated;
  }

  private clearData(
    command: UpdateClassroomsModuleCommand
  ): UpdateClassroomsModuleCommand {
    return cleanObject({
      where: cleanObject({
        classroomsModuleId: cleanValue(command?.where?.classroomsModuleId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
