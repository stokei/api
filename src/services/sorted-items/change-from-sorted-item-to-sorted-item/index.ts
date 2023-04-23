import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ChangeFromSortedItemToSortedItemCommand } from '@/commands/implements/sorted-items/change-from-sorted-item-to-sorted-item.command';
import { ChangeFromSortedItemToSortedItemDTO } from '@/dtos/sorted-items/change-from-sorted-item-to-sorted-item.dto';
import { SortedItemModel } from '@/models/sorted-item.model';

interface ChangeFromSortedItemToSortedItemServiceResponse {
  fromItem: SortedItemModel;
  toItem: SortedItemModel;
}

@Injectable()
export class ChangeFromSortedItemToSortedItemService
  implements
    IBaseService<
      ChangeFromSortedItemToSortedItemDTO,
      Promise<ChangeFromSortedItemToSortedItemServiceResponse>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: ChangeFromSortedItemToSortedItemDTO
  ): Promise<ChangeFromSortedItemToSortedItemServiceResponse> {
    return await this.commandBus.execute(
      new ChangeFromSortedItemToSortedItemCommand(data)
    );
  }
}
