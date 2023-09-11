import { ICommand } from '@nestjs/cqrs';

import {
  UpdateVersionDataDTO,
  UpdateVersionDTO,
  UpdateVersionWhereDTO
} from '@/dtos/versions/update-version.dto';

export class UpdateVersionCommand implements ICommand, UpdateVersionDTO {
  data: UpdateVersionDataDTO;
  where: UpdateVersionWhereDTO;
  constructor(data: UpdateVersionDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
