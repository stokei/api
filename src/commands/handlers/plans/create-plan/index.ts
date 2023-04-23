import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePlanCommand } from '@/commands/implements/plans/create-plan.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PlanAlreadyExistsException,
  PlanNotFoundException
} from '@/errors';
import { CreatePlanRepository } from '@/repositories/plans/create-plan';
import { FindAllPlansService } from '@/services/plans/find-all-plans';

type CreatePlanCommandKeys = keyof CreatePlanCommand;

@CommandHandler(CreatePlanCommand)
export class CreatePlanCommandHandler
  implements ICommandHandler<CreatePlanCommand>
{
  constructor(
    private readonly createPlanRepository: CreatePlanRepository,
    private readonly findAllPlansService: FindAllPlansService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePlanCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreatePlanCommandKeys>('app');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreatePlanCommandKeys>('name');
    }
    if (!data?.type) {
      throw new ParamNotFoundException<CreatePlanCommandKeys>('type');
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreatePlanCommandKeys>('createdBy');
    }

    const plans = await this.findAllPlansService.execute({
      where: {
        AND: {
          app: {
            equals: data.app
          },
          type: data.type
        }
      },
      page: {
        limit: 1
      }
    });
    if (plans?.totalCount > 0) {
      throw new PlanAlreadyExistsException();
    }

    const planCreated = await this.createPlanRepository.execute(data);
    if (!planCreated) {
      throw new PlanNotFoundException();
    }

    const planModel = this.publisher.mergeObjectContext(planCreated);
    planModel.createdPlan({
      createdBy: data.createdBy
    });
    planModel.commit();

    return planCreated;
  }

  private clearData(command: CreatePlanCommand): CreatePlanCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      description: cleanValue(command?.description),
      type: cleanValue(command?.type)
    });
  }
}
