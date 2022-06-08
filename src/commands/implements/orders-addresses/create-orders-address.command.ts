import { ICommand } from '@nestjs/cqrs';
import { CreateOrdersAddressDTO } from '@/dtos/orders-addresses/create-orders-address.dto';

export class CreateOrdersAddressCommand
  implements ICommand, CreateOrdersAddressDTO
{
  name: string;
  parent: string;

  constructor(data: CreateOrdersAddressDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
