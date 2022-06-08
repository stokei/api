import { UpdateSitesLightColorCommand } from '@/commands/implements/sites-light-colors/update-sites-light-color.command';
import { UpdateSitesLightColorDTO } from '@/dtos/sites-light-colors/update-sites-light-color.dto';
import { SitesLightColorModel } from '@/models/sites-light-color.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateSitesLightColorService
  implements
    IBaseService<UpdateSitesLightColorDTO, Promise<SitesLightColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateSitesLightColorDTO): Promise<SitesLightColorModel> {
    return await this.commandBus.execute(
      new UpdateSitesLightColorCommand(data)
    );
  }
}
