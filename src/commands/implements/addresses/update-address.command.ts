import { ICommand } from '@nestjs/cqrs';

import {
  UpdateAddressDataDTO,
  UpdateAddressDTO,
  UpdateAddressWhereDTO
} from '@/dtos/addresses/update-address.dto';

export class UpdateAddressCommand implements ICommand, UpdateAddressDTO {
  data: UpdateAddressDataDTO;
  where: UpdateAddressWhereDTO;
  constructor(data: UpdateAddressDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
