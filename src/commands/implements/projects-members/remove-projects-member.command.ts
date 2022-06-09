import { ICommand } from '@nestjs/cqrs';

import {
  RemoveProjectsMemberDTO,
  RemoveProjectsMemberWhereDTO
} from '@/dtos/projects-members/remove-projects-member.dto';

export class RemoveProjectsMemberCommand
  implements ICommand, RemoveProjectsMemberDTO
{
  where: RemoveProjectsMemberWhereDTO;
  constructor(data: RemoveProjectsMemberDTO) {
    this.where = data.where;
  }
}
