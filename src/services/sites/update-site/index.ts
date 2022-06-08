import { UpdateSiteCommand } from '@/commands/implements/sites/update-site.command';
import { UpdateSiteDTO } from '@/dtos/sites/update-site.dto';
import { SiteModel } from '@/models/site.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateSiteService
  implements IBaseService<UpdateSiteDTO, Promise<SiteModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateSiteDTO): Promise<SiteModel> {
    return await this.commandBus.execute(new UpdateSiteCommand(data));
  }
}
