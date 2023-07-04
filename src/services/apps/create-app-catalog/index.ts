import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppCatalogCommand } from '@/commands/implements/apps/create-app-catalog.command';
import { CreateAppCatalogDTO } from '@/dtos/apps/create-app-catalog.dto';
import { AppModel } from '@/models/app.model';

@Injectable()
export class CreateAppCatalogService
  implements IBaseService<CreateAppCatalogDTO, Promise<AppModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAppCatalogDTO): Promise<AppModel> {
    return await this.commandBus.execute(new CreateAppCatalogCommand(data));
  }
}
