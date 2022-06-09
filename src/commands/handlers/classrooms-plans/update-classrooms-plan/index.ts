import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateClassroomsPlanCommand } from '@/commands/implements/classrooms-plans/update-classrooms-plan.command';
import {
  ClassroomsPlanNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsPlanByIdRepository } from '@/repositories/classrooms-plans/find-classrooms-plan-by-id';
import { UpdateClassroomsPlanRepository } from '@/repositories/classrooms-plans/update-classrooms-plan';

type UpdateClassroomsPlanCommandKeys = keyof UpdateClassroomsPlanCommand;

@CommandHandler(UpdateClassroomsPlanCommand)
export class UpdateClassroomsPlanCommandHandler
  implements ICommandHandler<UpdateClassroomsPlanCommand>
{
  constructor(
    private readonly findClassroomsPlanByIdRepository: FindClassroomsPlanByIdRepository,
    private readonly updateClassroomsPlanRepository: UpdateClassroomsPlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomsPlanCommand) {
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

    const updated = await this.updateClassroomsPlanRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomsPlanId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomsPlanUpdated =
      await this.findClassroomsPlanByIdRepository.execute(classroomsPlanId);
    if (!classroomsPlanUpdated) {
      throw new ClassroomsPlanNotFoundException();
    }
    const classroomsPlanModel = this.publisher.mergeObjectContext(
      classroomsPlanUpdated
    );
    classroomsPlanModel.updatedClassroomsPlan();
    classroomsPlanModel.commit();

    return classroomsPlanUpdated;
  }

  private clearData(
    command: UpdateClassroomsPlanCommand
  ): UpdateClassroomsPlanCommand {
    return cleanObject({
      where: cleanObject({
        classroomsPlanId: cleanValue(command?.where?.classroomsPlanId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
