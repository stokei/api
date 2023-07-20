import { ICommand } from '@nestjs/cqrs';

import {
  RemoveMaterialDTO,
  RemoveMaterialWhereDTO
} from '@/dtos/materials/remove-material.dto';

export class RemoveMaterialCommand implements ICommand, RemoveMaterialDTO {
  where: RemoveMaterialWhereDTO;
  constructor(data: RemoveMaterialDTO) {
    this.where = data.where;
  }
}
