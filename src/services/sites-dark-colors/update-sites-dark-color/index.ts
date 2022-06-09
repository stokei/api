import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateSitesDarkColorCommand } from '@/commands/implements/sites-dark-colors/update-sites-dark-color.command';
import { UpdateSitesDarkColorDTO } from '@/dtos/sites-dark-colors/update-sites-dark-color.dto';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';

@Injectable()
export class UpdateSitesDarkColorService
  implements
    IBaseService<UpdateSitesDarkColorDTO, Promise<SitesDarkColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateSitesDarkColorDTO): Promise<SitesDarkColorModel> {
    return await this.commandBus.execute(new UpdateSitesDarkColorCommand(data));
  }
}
