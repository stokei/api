import { CreateSitesDarkColorCommand } from '@/commands/implements/sites-dark-colors/create-sites-dark-color.command';
import { CreateSitesDarkColorDTO } from '@/dtos/sites-dark-colors/create-sites-dark-color.dto';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateSitesDarkColorService
  implements
    IBaseService<CreateSitesDarkColorDTO, Promise<SitesDarkColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateSitesDarkColorDTO): Promise<SitesDarkColorModel> {
    return await this.commandBus.execute(new CreateSitesDarkColorCommand(data));
  }
}
