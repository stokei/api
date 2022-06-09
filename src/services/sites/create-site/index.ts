import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateSiteCommand } from '@/commands/implements/sites/create-site.command';
import { CreateSiteDTO } from '@/dtos/sites/create-site.dto';
import { SiteModel } from '@/models/site.model';

@Injectable()
export class CreateSiteService
  implements IBaseService<CreateSiteDTO, Promise<SiteModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateSiteDTO): Promise<SiteModel> {
    return await this.commandBus.execute(new CreateSiteCommand(data));
  }
}
