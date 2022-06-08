import { ICommand } from '@nestjs/cqrs';
import {
  UpdateOrdersAddressDTO,
  UpdateOrdersAddressDataDTO,
  UpdateOrdersAddressWhereDTO
} from '@/dtos/orders-addresses/update-orders-address.dto';

export class UpdateOrdersAddressCommand
  implements ICommand, UpdateOrdersAddressDTO
{
  data: UpdateOrdersAddressDataDTO;
  where: UpdateOrdersAddressWhereDTO;
  constructor(data: UpdateOrdersAddressDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
