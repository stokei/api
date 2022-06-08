import { UpdatePlanCommand } from '@/commands/implements/plans/update-plan.command';
import { UpdatePlanDTO } from '@/dtos/plans/update-plan.dto';
import { PlanModel } from '@/models/plan.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdatePlanService
  implements IBaseService<UpdatePlanDTO, Promise<PlanModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdatePlanDTO): Promise<PlanModel> {
    return await this.commandBus.execute(new UpdatePlanCommand(data));
  }
}
