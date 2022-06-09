import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveProjectCommand } from '@/commands/implements/projects/remove-project.command';
import { RemoveProjectDTO } from '@/dtos/projects/remove-project.dto';
import { ProjectModel } from '@/models/project.model';

@Injectable()
export class RemoveProjectService
  implements IBaseService<RemoveProjectDTO, Promise<ProjectModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveProjectDTO): Promise<ProjectModel> {
    return await this.commandBus.execute(new RemoveProjectCommand(data));
  }
}
