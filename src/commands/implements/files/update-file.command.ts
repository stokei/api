import { ICommand } from '@nestjs/cqrs';

import {
  UpdateFileDataDTO,
  UpdateFileDTO,
  UpdateFileWhereDTO
} from '@/dtos/files/update-file.dto';

export class UpdateFileCommand implements ICommand, UpdateFileDTO {
  data: UpdateFileDataDTO;
  where: UpdateFileWhereDTO;
  constructor(data: UpdateFileDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
