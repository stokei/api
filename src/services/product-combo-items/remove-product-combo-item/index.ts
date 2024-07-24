import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveProductComboItemCommand } from '@/commands/implements/product-combo-items/remove-product-combo-item.command';
import { RemoveProductComboItemDTO } from '@/dtos/product-combo-items/remove-product-combo-item.dto';
import { ProductComboItemModel } from '@/models/product-combo-item.model';

@Injectable()
export class RemoveProductComboItemService
  implements
    IBaseService<RemoveProductComboItemDTO, Promise<ProductComboItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveProductComboItemDTO
  ): Promise<ProductComboItemModel> {
    return await this.commandBus.execute(
      new RemoveProductComboItemCommand(data)
    );
  }
}
