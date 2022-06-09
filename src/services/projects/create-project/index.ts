import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateProjectCommand } from '@/commands/implements/projects/create-project.command';
import { CreateProjectDTO } from '@/dtos/projects/create-project.dto';
import { ProjectModel } from '@/models/project.model';

@Injectable()
export class CreateProjectService
  implements IBaseService<CreateProjectDTO, Promise<ProjectModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateProjectDTO): Promise<ProjectModel> {
    return await this.commandBus.execute(new CreateProjectCommand(data));
  }
}
