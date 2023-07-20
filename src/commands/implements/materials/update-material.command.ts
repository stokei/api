import { ICommand } from '@nestjs/cqrs';

import {
  UpdateMaterialDataDTO,
  UpdateMaterialDTO,
  UpdateMaterialWhereDTO
} from '@/dtos/materials/update-material.dto';

export class UpdateMaterialCommand implements ICommand, UpdateMaterialDTO {
  data: UpdateMaterialDataDTO;
  where: UpdateMaterialWhereDTO;
  constructor(data: UpdateMaterialDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
