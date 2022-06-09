import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveMetatagCommand } from '@/commands/implements/metatags/remove-metatag.command';
import { RemoveMetatagDTO } from '@/dtos/metatags/remove-metatag.dto';
import { MetatagModel } from '@/models/metatag.model';

@Injectable()
export class RemoveMetatagService
  implements IBaseService<RemoveMetatagDTO, Promise<MetatagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveMetatagDTO): Promise<MetatagModel> {
    return await this.commandBus.execute(new RemoveMetatagCommand(data));
  }
}
