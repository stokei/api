import { ICommand } from '@nestjs/cqrs';
import {
  UpdateOrdersSellerDTO,
  UpdateOrdersSellerDataDTO,
  UpdateOrdersSellerWhereDTO
} from '@/dtos/orders-sellers/update-orders-seller.dto';

export class UpdateOrdersSellerCommand
  implements ICommand, UpdateOrdersSellerDTO
{
  data: UpdateOrdersSellerDataDTO;
  where: UpdateOrdersSellerWhereDTO;
  constructor(data: UpdateOrdersSellerDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
