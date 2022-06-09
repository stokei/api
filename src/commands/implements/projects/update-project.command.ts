import { ICommand } from '@nestjs/cqrs';

import {
  UpdateProjectDataDTO,
  UpdateProjectDTO,
  UpdateProjectWhereDTO
} from '@/dtos/projects/update-project.dto';

export class UpdateProjectCommand implements ICommand, UpdateProjectDTO {
  data: UpdateProjectDataDTO;
  where: UpdateProjectWhereDTO;
  constructor(data: UpdateProjectDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
