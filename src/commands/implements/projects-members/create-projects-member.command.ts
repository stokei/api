import { ICommand } from '@nestjs/cqrs';

import { CreateProjectsMemberDTO } from '@/dtos/projects-members/create-projects-member.dto';

export class CreateProjectsMemberCommand
  implements ICommand, CreateProjectsMemberDTO
{
  name: string;
  parent: string;

  constructor(data: CreateProjectsMemberDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
