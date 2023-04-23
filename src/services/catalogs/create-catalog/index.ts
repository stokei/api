import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCatalogCommand } from '@/commands/implements/catalogs/create-catalog.command';
import { CreateCatalogDTO } from '@/dtos/catalogs/create-catalog.dto';
import { CatalogModel } from '@/models/catalog.model';

@Injectable()
export class CreateCatalogService
  implements IBaseService<CreateCatalogDTO, Promise<CatalogModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCatalogDTO): Promise<CatalogModel> {
    return await this.commandBus.execute(new CreateCatalogCommand(data));
  }
}
