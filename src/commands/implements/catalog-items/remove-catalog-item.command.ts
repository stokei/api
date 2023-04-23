import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCatalogItemDTO,
  RemoveCatalogItemWhereDTO
} from '@/dtos/catalog-items/remove-catalog-item.dto';

export class RemoveCatalogItemCommand
  implements ICommand, RemoveCatalogItemDTO
{
  where: RemoveCatalogItemWhereDTO;
  constructor(data: RemoveCatalogItemDTO) {
    this.where = data.where;
  }
}
