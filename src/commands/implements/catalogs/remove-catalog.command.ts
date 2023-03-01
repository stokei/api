import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCatalogDTO,
  RemoveCatalogWhereDTO
} from '@/dtos/catalogs/remove-catalog.dto';

export class RemoveCatalogCommand implements ICommand, RemoveCatalogDTO {
  where: RemoveCatalogWhereDTO;
  constructor(data: RemoveCatalogDTO) {
    this.where = data.where;
  }
}
