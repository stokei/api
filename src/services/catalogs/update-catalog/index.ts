import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCatalogCommand } from '@/commands/implements/catalogs/update-catalog.command';
import { UpdateCatalogDTO } from '@/dtos/catalogs/update-catalog.dto';
import { CatalogModel } from '@/models/catalog.model';

@Injectable()
export class UpdateCatalogService
  implements IBaseService<UpdateCatalogDTO, Promise<CatalogModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCatalogDTO): Promise<CatalogModel> {
    return await this.commandBus.execute(new UpdateCatalogCommand(data));
  }
}
