import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateSortedItemCommand } from '@/commands/implements/sorted-items/create-sorted-item.command';
import { CreateSortedItemDTO } from '@/dtos/sorted-items/create-sorted-item.dto';
import { SortedItemModel } from '@/models/sorted-item.model';

@Injectable()
export class CreateSortedItemService
  implements IBaseService<CreateSortedItemDTO, Promise<SortedItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateSortedItemDTO): Promise<SortedItemModel> {
    return await this.commandBus.execute(new CreateSortedItemCommand(data));
  }
}
