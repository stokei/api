import { UpdateMetatagCommand } from '@/commands/implements/metatags/update-metatag.command';
import { UpdateMetatagDTO } from '@/dtos/metatags/update-metatag.dto';
import { MetatagModel } from '@/models/metatag.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateMetatagService
  implements IBaseService<UpdateMetatagDTO, Promise<MetatagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateMetatagDTO): Promise<MetatagModel> {
    return await this.commandBus.execute(new UpdateMetatagCommand(data));
  }
}
