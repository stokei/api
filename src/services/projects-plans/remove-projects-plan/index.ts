import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveProjectsPlanCommand } from '@/commands/implements/projects-plans/remove-projects-plan.command';
import { RemoveProjectsPlanDTO } from '@/dtos/projects-plans/remove-projects-plan.dto';
import { ProjectsPlanModel } from '@/models/projects-plan.model';

@Injectable()
export class RemoveProjectsPlanService
  implements IBaseService<RemoveProjectsPlanDTO, Promise<ProjectsPlanModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveProjectsPlanDTO): Promise<ProjectsPlanModel> {
    return await this.commandBus.execute(new RemoveProjectsPlanCommand(data));
  }
}
