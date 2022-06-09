import { ICommand } from '@nestjs/cqrs';

import {
  RemoveOrdersSellerDTO,
  RemoveOrdersSellerWhereDTO
} from '@/dtos/orders-sellers/remove-orders-seller.dto';

export class RemoveOrdersSellerCommand
  implements ICommand, RemoveOrdersSellerDTO
{
  where: RemoveOrdersSellerWhereDTO;
  constructor(data: RemoveOrdersSellerDTO) {
    this.where = data.where;
  }
}
