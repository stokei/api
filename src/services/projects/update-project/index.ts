import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateProjectCommand } from '@/commands/implements/projects/update-project.command';
import { UpdateProjectDTO } from '@/dtos/projects/update-project.dto';
import { ProjectModel } from '@/models/project.model';

@Injectable()
export class UpdateProjectService
  implements IBaseService<UpdateProjectDTO, Promise<ProjectModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateProjectDTO): Promise<ProjectModel> {
    return await this.commandBus.execute(new UpdateProjectCommand(data));
  }
}
