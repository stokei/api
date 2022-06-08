import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateClassroomsPlanCommand } from '@/commands/implements/classrooms-plans/create-classrooms-plan.command';
import {
  ClassroomsPlanNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomsPlanRepository } from '@/repositories/classrooms-plans/create-classrooms-plan';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateClassroomsPlanCommandKeys = keyof CreateClassroomsPlanCommand;

@CommandHandler(CreateClassroomsPlanCommand)
export class CreateClassroomsPlanCommandHandler
  implements ICommandHandler<CreateClassroomsPlanCommand>
{
  constructor(
    private readonly createClassroomsPlanRepository: CreateClassroomsPlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomsPlanCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomsPlanCommandKeys>(
        'parent'
      );
    }

    const classroomsPlanCreated =
      await this.createClassroomsPlanRepository.execute(data);
    if (!classroomsPlanCreated) {
      throw new ClassroomsPlanNotFoundException();
    }
    const classroomsPlanModel = this.publisher.mergeObjectContext(
      classroomsPlanCreated
    );
    classroomsPlanModel.createdClassroomsPlan();
    classroomsPlanModel.commit();

    return classroomsPlanCreated;
  }

  private clearData(
    command: CreateClassroomsPlanCommand
  ): CreateClassroomsPlanCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
