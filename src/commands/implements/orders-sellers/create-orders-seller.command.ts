import { ICommand } from '@nestjs/cqrs';
import { CreateOrdersSellerDTO } from '@/dtos/orders-sellers/create-orders-seller.dto';

export class CreateOrdersSellerCommand
  implements ICommand, CreateOrdersSellerDTO
{
  name: string;
  parent: string;

  constructor(data: CreateOrdersSellerDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
