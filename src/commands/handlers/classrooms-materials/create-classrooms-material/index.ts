import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateClassroomsMaterialCommand } from '@/commands/implements/classrooms-materials/create-classrooms-material.command';
import {
  ClassroomsMaterialNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomsMaterialRepository } from '@/repositories/classrooms-materials/create-classrooms-material';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateClassroomsMaterialCommandKeys =
  keyof CreateClassroomsMaterialCommand;

@CommandHandler(CreateClassroomsMaterialCommand)
export class CreateClassroomsMaterialCommandHandler
  implements ICommandHandler<CreateClassroomsMaterialCommand>
{
  constructor(
    private readonly createClassroomsMaterialRepository: CreateClassroomsMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomsMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomsMaterialCommandKeys>(
        'parent'
      );
    }

    const classroomsMaterialCreated =
      await this.createClassroomsMaterialRepository.execute(data);
    if (!classroomsMaterialCreated) {
      throw new ClassroomsMaterialNotFoundException();
    }
    const classroomsMaterialModel = this.publisher.mergeObjectContext(
      classroomsMaterialCreated
    );
    classroomsMaterialModel.createdClassroomsMaterial();
    classroomsMaterialModel.commit();

    return classroomsMaterialCreated;
  }

  private clearData(
    command: CreateClassroomsMaterialCommand
  ): CreateClassroomsMaterialCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
