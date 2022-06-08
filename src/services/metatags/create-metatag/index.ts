import { CreateMetatagCommand } from '@/commands/implements/metatags/create-metatag.command';
import { CreateMetatagDTO } from '@/dtos/metatags/create-metatag.dto';
import { MetatagModel } from '@/models/metatag.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateMetatagService
  implements IBaseService<CreateMetatagDTO, Promise<MetatagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateMetatagDTO): Promise<MetatagModel> {
    return await this.commandBus.execute(new CreateMetatagCommand(data));
  }
}
