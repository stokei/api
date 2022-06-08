import { ICommand } from '@nestjs/cqrs';
import {
  RemoveOrdersAddressDTO,
  RemoveOrdersAddressWhereDTO
} from '@/dtos/orders-addresses/remove-orders-address.dto';

export class RemoveOrdersAddressCommand
  implements ICommand, RemoveOrdersAddressDTO
{
  where: RemoveOrdersAddressWhereDTO;
  constructor(data: RemoveOrdersAddressDTO) {
    this.where = data.where;
  }
}
