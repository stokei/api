import { CreatePlanCommand } from '@/commands/implements/plans/create-plan.command';
import { CreatePlanDTO } from '@/dtos/plans/create-plan.dto';
import { PlanModel } from '@/models/plan.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreatePlanService
  implements IBaseService<CreatePlanDTO, Promise<PlanModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePlanDTO): Promise<PlanModel> {
    return await this.commandBus.execute(new CreatePlanCommand(data));
  }
}
