import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateSortedItemCommand } from '@/commands/implements/sorted-items/update-sorted-item.command';
import { UpdateSortedItemDTO } from '@/dtos/sorted-items/update-sorted-item.dto';
import { SortedItemModel } from '@/models/sorted-item.model';

@Injectable()
export class UpdateSortedItemService
  implements IBaseService<UpdateSortedItemDTO, Promise<SortedItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateSortedItemDTO): Promise<SortedItemModel> {
    return await this.commandBus.execute(new UpdateSortedItemCommand(data));
  }
}
