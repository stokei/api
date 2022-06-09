import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveSitesLightColorCommand } from '@/commands/implements/sites-light-colors/remove-sites-light-color.command';
import { RemoveSitesLightColorDTO } from '@/dtos/sites-light-colors/remove-sites-light-color.dto';
import { SitesLightColorModel } from '@/models/sites-light-color.model';

@Injectable()
export class RemoveSitesLightColorService
  implements
    IBaseService<RemoveSitesLightColorDTO, Promise<SitesLightColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveSitesLightColorDTO): Promise<SitesLightColorModel> {
    return await this.commandBus.execute(
      new RemoveSitesLightColorCommand(data)
    );
  }
}
