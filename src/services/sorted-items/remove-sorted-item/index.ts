import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveSortedItemCommand } from '@/commands/implements/sorted-items/remove-sorted-item.command';
import { RemoveSortedItemDTO } from '@/dtos/sorted-items/remove-sorted-item.dto';
import { SortedItemModel } from '@/models/sorted-item.model';

@Injectable()
export class RemoveSortedItemService
  implements IBaseService<RemoveSortedItemDTO, Promise<SortedItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveSortedItemDTO): Promise<SortedItemModel> {
    return await this.commandBus.execute(new RemoveSortedItemCommand(data));
  }
}
