import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveCatalogItemCommand } from '@/commands/implements/catalog-items/remove-catalog-item.command';
import { RemoveCatalogItemDTO } from '@/dtos/catalog-items/remove-catalog-item.dto';
import { CatalogItemModel } from '@/models/catalog-item.model';

@Injectable()
export class RemoveCatalogItemService
  implements IBaseService<RemoveCatalogItemDTO, Promise<CatalogItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCatalogItemDTO): Promise<CatalogItemModel> {
    return await this.commandBus.execute(new RemoveCatalogItemCommand(data));
  }
}
