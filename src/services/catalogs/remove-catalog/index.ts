import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveCatalogCommand } from '@/commands/implements/catalogs/remove-catalog.command';
import { RemoveCatalogDTO } from '@/dtos/catalogs/remove-catalog.dto';
import { CatalogModel } from '@/models/catalog.model';

@Injectable()
export class RemoveCatalogService
  implements IBaseService<RemoveCatalogDTO, Promise<CatalogModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCatalogDTO): Promise<CatalogModel> {
    return await this.commandBus.execute(new RemoveCatalogCommand(data));
  }
}
