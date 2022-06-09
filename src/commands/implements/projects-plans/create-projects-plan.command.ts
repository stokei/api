import { ICommand } from '@nestjs/cqrs';

import { CreateProjectsPlanDTO } from '@/dtos/projects-plans/create-projects-plan.dto';

export class CreateProjectsPlanCommand
  implements ICommand, CreateProjectsPlanDTO
{
  name: string;
  parent: string;

  constructor(data: CreateProjectsPlanDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
