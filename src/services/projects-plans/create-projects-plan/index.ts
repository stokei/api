import { CreateProjectsPlanCommand } from '@/commands/implements/projects-plans/create-projects-plan.command';
import { CreateProjectsPlanDTO } from '@/dtos/projects-plans/create-projects-plan.dto';
import { ProjectsPlanModel } from '@/models/projects-plan.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateProjectsPlanService
  implements IBaseService<CreateProjectsPlanDTO, Promise<ProjectsPlanModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateProjectsPlanDTO): Promise<ProjectsPlanModel> {
    return await this.commandBus.execute(new CreateProjectsPlanCommand(data));
  }
}
