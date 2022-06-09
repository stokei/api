import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveSiteCommand } from '@/commands/implements/sites/remove-site.command';
import { RemoveSiteDTO } from '@/dtos/sites/remove-site.dto';
import { SiteModel } from '@/models/site.model';

@Injectable()
export class RemoveSiteService
  implements IBaseService<RemoveSiteDTO, Promise<SiteModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveSiteDTO): Promise<SiteModel> {
    return await this.commandBus.execute(new RemoveSiteCommand(data));
  }
}
