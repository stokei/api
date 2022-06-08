import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateClassroomCommand } from '@/commands/implements/classrooms/create-classroom.command';
import {
  ClassroomNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomRepository } from '@/repositories/classrooms/create-classroom';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateClassroomCommandKeys = keyof CreateClassroomCommand;

@CommandHandler(CreateClassroomCommand)
export class CreateClassroomCommandHandler
  implements ICommandHandler<CreateClassroomCommand>
{
  constructor(
    private readonly createClassroomRepository: CreateClassroomRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomCommandKeys>('parent');
    }

    const classroomCreated = await this.createClassroomRepository.execute(data);
    if (!classroomCreated) {
      throw new ClassroomNotFoundException();
    }
    const classroomModel = this.publisher.mergeObjectContext(classroomCreated);
    classroomModel.createdClassroom();
    classroomModel.commit();

    return classroomCreated;
  }

  private clearData(command: CreateClassroomCommand): CreateClassroomCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
