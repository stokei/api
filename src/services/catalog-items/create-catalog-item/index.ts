import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCatalogItemCommand } from '@/commands/implements/catalog-items/create-catalog-item.command';
import { CreateCatalogItemDTO } from '@/dtos/catalog-items/create-catalog-item.dto';
import { CatalogItemModel } from '@/models/catalog-item.model';

@Injectable()
export class CreateCatalogItemService
  implements IBaseService<CreateCatalogItemDTO, Promise<CatalogItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCatalogItemDTO): Promise<CatalogItemModel> {
    return await this.commandBus.execute(new CreateCatalogItemCommand(data));
  }
}
