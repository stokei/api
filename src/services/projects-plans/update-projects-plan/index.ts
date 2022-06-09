import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateProjectsPlanCommand } from '@/commands/implements/projects-plans/update-projects-plan.command';
import { UpdateProjectsPlanDTO } from '@/dtos/projects-plans/update-projects-plan.dto';
import { ProjectsPlanModel } from '@/models/projects-plan.model';

@Injectable()
export class UpdateProjectsPlanService
  implements IBaseService<UpdateProjectsPlanDTO, Promise<ProjectsPlanModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateProjectsPlanDTO): Promise<ProjectsPlanModel> {
    return await this.commandBus.execute(new UpdateProjectsPlanCommand(data));
  }
}
