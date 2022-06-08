import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClassroomsMaterialCommand } from '@/commands/implements/classrooms-materials/update-classrooms-material.command';
import {
  ClassroomsMaterialNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsMaterialByIdRepository } from '@/repositories/classrooms-materials/find-classrooms-material-by-id';
import { UpdateClassroomsMaterialRepository } from '@/repositories/classrooms-materials/update-classrooms-material';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateClassroomsMaterialCommandKeys =
  keyof UpdateClassroomsMaterialCommand;

@CommandHandler(UpdateClassroomsMaterialCommand)
export class UpdateClassroomsMaterialCommandHandler
  implements ICommandHandler<UpdateClassroomsMaterialCommand>
{
  constructor(
    private readonly findClassroomsMaterialByIdRepository: FindClassroomsMaterialByIdRepository,
    private readonly updateClassroomsMaterialRepository: UpdateClassroomsMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomsMaterialCommand) {
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

    const updated = await this.updateClassroomsMaterialRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomsMaterialId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomsMaterialUpdated =
      await this.findClassroomsMaterialByIdRepository.execute(
        classroomsMaterialId
      );
    if (!classroomsMaterialUpdated) {
      throw new ClassroomsMaterialNotFoundException();
    }
    const classroomsMaterialModel = this.publisher.mergeObjectContext(
      classroomsMaterialUpdated
    );
    classroomsMaterialModel.updatedClassroomsMaterial();
    classroomsMaterialModel.commit();

    return classroomsMaterialUpdated;
  }

  private clearData(
    command: UpdateClassroomsMaterialCommand
  ): UpdateClassroomsMaterialCommand {
    return cleanObject({
      where: cleanObject({
        classroomsMaterialId: cleanValue(command?.where?.classroomsMaterialId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
