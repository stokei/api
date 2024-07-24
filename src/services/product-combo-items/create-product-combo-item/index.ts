import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateProductComboItemCommand } from '@/commands/implements/product-combo-items/create-product-combo-item.command';
import { CreateProductComboItemDTO } from '@/dtos/product-combo-items/create-product-combo-item.dto';
import { ProductComboItemModel } from '@/models/product-combo-item.model';

@Injectable()
export class CreateProductComboItemService
  implements
    IBaseService<CreateProductComboItemDTO, Promise<ProductComboItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateProductComboItemDTO
  ): Promise<ProductComboItemModel> {
    return await this.commandBus.execute(
      new CreateProductComboItemCommand(data)
    );
  }
}
