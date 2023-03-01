import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCatalogDataDTO,
  UpdateCatalogDTO,
  UpdateCatalogWhereDTO
} from '@/dtos/catalogs/update-catalog.dto';

export class UpdateCatalogCommand implements ICommand, UpdateCatalogDTO {
  data: UpdateCatalogDataDTO;
  where: UpdateCatalogWhereDTO;
  constructor(data: UpdateCatalogDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
