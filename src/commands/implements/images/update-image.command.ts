import { ICommand } from '@nestjs/cqrs';

import {
  UpdateImageDataDTO,
  UpdateImageDTO,
  UpdateImageWhereDTO
} from '@/dtos/images/update-image.dto';

export class UpdateImageCommand implements ICommand, UpdateImageDTO {
  data: UpdateImageDataDTO;
  where: UpdateImageWhereDTO;
  constructor(data: UpdateImageDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
