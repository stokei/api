import { CreateSitesLightColorCommand } from '@/commands/implements/sites-light-colors/create-sites-light-color.command';
import { CreateSitesLightColorDTO } from '@/dtos/sites-light-colors/create-sites-light-color.dto';
import { SitesLightColorModel } from '@/models/sites-light-color.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateSitesLightColorService
  implements
    IBaseService<CreateSitesLightColorDTO, Promise<SitesLightColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateSitesLightColorDTO): Promise<SitesLightColorModel> {
    return await this.commandBus.execute(
      new CreateSitesLightColorCommand(data)
    );
  }
}
