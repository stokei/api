import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateClassroomModuleCommand } from '@/commands/implements/classroom-modules/update-classroom-module.command';
import {
  ClassroomModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomModuleByIdRepository } from '@/repositories/classroom-modules/find-classroom-module-by-id';
import { UpdateClassroomModuleRepository } from '@/repositories/classroom-modules/update-classroom-module';

type UpdateClassroomModuleCommandKeys = keyof UpdateClassroomModuleCommand;

@CommandHandler(UpdateClassroomModuleCommand)
export class UpdateClassroomModuleCommandHandler
  implements ICommandHandler<UpdateClassroomModuleCommand>
{
  constructor(
    private readonly findClassroomModuleByIdRepository: FindClassroomModuleByIdRepository,
    private readonly updateClassroomModuleRepository: UpdateClassroomModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomModuleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomModuleId = splitServiceId(data.where?.classroomModuleId)?.id;
    if (!classroomModuleId) {
      throw new ParamNotFoundException('classroomModuleId');
    }

    const classroomModule =
      await this.findClassroomModuleByIdRepository.execute(classroomModuleId);
    if (!classroomModule) {
      throw new ClassroomModuleNotFoundException();
    }

    const updated = await this.updateClassroomModuleRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomModuleId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomModuleUpdated =
      await this.findClassroomModuleByIdRepository.execute(classroomModuleId);
    if (!classroomModuleUpdated) {
      throw new ClassroomModuleNotFoundException();
    }
    const classroomModuleModel = this.publisher.mergeObjectContext(
      classroomModuleUpdated
    );
    classroomModuleModel.updatedClassroomModule({
      updatedBy: data.data.updatedBy
    });
    classroomModuleModel.commit();

    return classroomModuleUpdated;
  }

  private clearData(
    command: UpdateClassroomModuleCommand
  ): UpdateClassroomModuleCommand {
    return cleanObject({
      where: cleanObject({
        classroomModuleId: cleanValue(command?.where?.classroomModuleId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
