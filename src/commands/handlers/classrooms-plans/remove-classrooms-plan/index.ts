import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveClassroomsPlanCommand } from '@/commands/implements/classrooms-plans/remove-classrooms-plan.command';
import {
  ClassroomsPlanNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsPlanByIdRepository } from '@/repositories/classrooms-plans/find-classrooms-plan-by-id';
import { RemoveClassroomsPlanRepository } from '@/repositories/classrooms-plans/remove-classrooms-plan';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveClassroomsPlanCommandKeys = keyof RemoveClassroomsPlanCommand;

@CommandHandler(RemoveClassroomsPlanCommand)
export class RemoveClassroomsPlanCommandHandler
  implements ICommandHandler<RemoveClassroomsPlanCommand>
{
  constructor(
    private readonly findClassroomsPlanByIdRepository: FindClassroomsPlanByIdRepository,
    private readonly removeClassroomsPlanRepository: RemoveClassroomsPlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomsPlanCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomsPlanId = splitServiceId(data.where?.classroomsPlanId)?.id;
    if (!classroomsPlanId) {
      throw new ParamNotFoundException('classroomsPlanId');
    }

    const classroomsPlan = await this.findClassroomsPlanByIdRepository.execute(
      classroomsPlanId
    );
    if (!classroomsPlan) {
      throw new ClassroomsPlanNotFoundException();
    }

    const removed = await this.removeClassroomsPlanRepository.execute({
      where: {
        classroomsPlanId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomsPlanModel =
      this.publisher.mergeObjectContext(classroomsPlan);
    classroomsPlanModel.removedClassroomsPlan();
    classroomsPlanModel.commit();

    return classroomsPlan;
  }

  private clearData(
    command: RemoveClassroomsPlanCommand
  ): RemoveClassroomsPlanCommand {
    return cleanObject({
      where: cleanObject({
        classroomsPlanId: cleanValue(command?.where?.classroomsPlanId)
      })
    });
  }
}
