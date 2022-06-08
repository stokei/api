import { RemovePlanCommand } from '@/commands/implements/plans/remove-plan.command';
import { RemovePlanDTO } from '@/dtos/plans/remove-plan.dto';
import { PlanModel } from '@/models/plan.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemovePlanService
  implements IBaseService<RemovePlanDTO, Promise<PlanModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemovePlanDTO): Promise<PlanModel> {
    return await this.commandBus.execute(new RemovePlanCommand(data));
  }
}
