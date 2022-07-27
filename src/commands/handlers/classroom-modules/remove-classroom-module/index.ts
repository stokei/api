import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveClassroomModuleCommand } from '@/commands/implements/classroom-modules/remove-classroom-module.command';
import {
  ClassroomModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAllClassroomModulesRepository } from '@/repositories/classroom-modules/find-all-classroom-modules';
import { RemoveClassroomModuleRepository } from '@/repositories/classroom-modules/remove-classroom-module';

@CommandHandler(RemoveClassroomModuleCommand)
export class RemoveClassroomModuleCommandHandler
  implements ICommandHandler<RemoveClassroomModuleCommand>
{
  constructor(
    private readonly findAllClassroomModulesRepository: FindAllClassroomModulesRepository,
    private readonly removeClassroomModuleRepository: RemoveClassroomModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomModuleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const { classroom, module, app } = data.where || {};
    if (!classroom) {
      throw new ParamNotFoundException('classroomId');
    }
    if (!module) {
      throw new ParamNotFoundException('moduleId');
    }

    const classroomModules =
      await this.findAllClassroomModulesRepository.execute({
        where: {
          AND: {
            app: {
              equals: app
            },
            classroom: {
              equals: classroom
            },
            module: {
              equals: module
            }
          }
        }
      });
    if (!classroomModules?.length) {
      throw new ClassroomModuleNotFoundException();
    }
    const classroomModule = classroomModules[0];
    const removed = await this.removeClassroomModuleRepository.execute({
      where: {
        ...data.where,
        classroom,
        module
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomModuleModel =
      this.publisher.mergeObjectContext(classroomModule);
    classroomModuleModel.removedClassroomModule({
      removedBy: data.where.removedBy
    });
    classroomModuleModel.commit();

    return classroomModule;
  }

  private clearData(
    command: RemoveClassroomModuleCommand
  ): RemoveClassroomModuleCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        classroom: cleanValue(command?.where?.classroom),
        module: cleanValue(command?.where?.module)
      })
    });
  }
}
