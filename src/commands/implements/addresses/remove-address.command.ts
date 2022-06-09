import { ICommand } from '@nestjs/cqrs';

import {
  RemoveAddressDTO,
  RemoveAddressWhereDTO
} from '@/dtos/addresses/remove-address.dto';

export class RemoveAddressCommand implements ICommand, RemoveAddressDTO {
  where: RemoveAddressWhereDTO;
  constructor(data: RemoveAddressDTO) {
    this.where = data.where;
  }
}
