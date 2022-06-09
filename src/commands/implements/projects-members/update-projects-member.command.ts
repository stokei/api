import { ICommand } from '@nestjs/cqrs';

import {
  UpdateProjectsMemberDataDTO,
  UpdateProjectsMemberDTO,
  UpdateProjectsMemberWhereDTO
} from '@/dtos/projects-members/update-projects-member.dto';

export class UpdateProjectsMemberCommand
  implements ICommand, UpdateProjectsMemberDTO
{
  data: UpdateProjectsMemberDataDTO;
  where: UpdateProjectsMemberWhereDTO;
  constructor(data: UpdateProjectsMemberDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
