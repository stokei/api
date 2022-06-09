import { ICommand } from '@nestjs/cqrs';

import {
  RemoveProjectDTO,
  RemoveProjectWhereDTO
} from '@/dtos/projects/remove-project.dto';

export class RemoveProjectCommand implements ICommand, RemoveProjectDTO {
  where: RemoveProjectWhereDTO;
  constructor(data: RemoveProjectDTO) {
    this.where = data.where;
  }
}
