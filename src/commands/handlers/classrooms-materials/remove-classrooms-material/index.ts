import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveClassroomsMaterialCommand } from '@/commands/implements/classrooms-materials/remove-classrooms-material.command';
import {
  ClassroomsMaterialNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsMaterialByIdRepository } from '@/repositories/classrooms-materials/find-classrooms-material-by-id';
import { RemoveClassroomsMaterialRepository } from '@/repositories/classrooms-materials/remove-classrooms-material';

type RemoveClassroomsMaterialCommandKeys =
  keyof RemoveClassroomsMaterialCommand;

@CommandHandler(RemoveClassroomsMaterialCommand)
export class RemoveClassroomsMaterialCommandHandler
  implements ICommandHandler<RemoveClassroomsMaterialCommand>
{
  constructor(
    private readonly findClassroomsMaterialByIdRepository: FindClassroomsMaterialByIdRepository,
    private readonly removeClassroomsMaterialRepository: RemoveClassroomsMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomsMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomsMaterialId = splitServiceId(
      data.where?.classroomsMaterialId
    )?.id;
    if (!classroomsMaterialId) {
      throw new ParamNotFoundException('classroomsMaterialId');
    }

    const classroomsMaterial =
      await this.findClassroomsMaterialByIdRepository.execute(
        classroomsMaterialId
      );
    if (!classroomsMaterial) {
      throw new ClassroomsMaterialNotFoundException();
    }

    const removed = await this.removeClassroomsMaterialRepository.execute({
      where: {
        classroomsMaterialId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomsMaterialModel =
      this.publisher.mergeObjectContext(classroomsMaterial);
    classroomsMaterialModel.removedClassroomsMaterial();
    classroomsMaterialModel.commit();

    return classroomsMaterial;
  }

  private clearData(
    command: RemoveClassroomsMaterialCommand
  ): RemoveClassroomsMaterialCommand {
    return cleanObject({
      where: cleanObject({
        classroomsMaterialId: cleanValue(command?.where?.classroomsMaterialId)
      })
    });
  }
}
