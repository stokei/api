import { RemoveSitesDarkColorCommand } from '@/commands/implements/sites-dark-colors/remove-sites-dark-color.command';
import { RemoveSitesDarkColorDTO } from '@/dtos/sites-dark-colors/remove-sites-dark-color.dto';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveSitesDarkColorService
  implements
    IBaseService<RemoveSitesDarkColorDTO, Promise<SitesDarkColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveSitesDarkColorDTO): Promise<SitesDarkColorModel> {
    return await this.commandBus.execute(new RemoveSitesDarkColorCommand(data));
  }
}
