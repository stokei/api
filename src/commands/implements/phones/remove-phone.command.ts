import { ICommand } from '@nestjs/cqrs';

import {
  RemovePhoneDTO,
  RemovePhoneWhereDTO
} from '@/dtos/phones/remove-phone.dto';

export class RemovePhoneCommand implements ICommand, RemovePhoneDTO {
  where: RemovePhoneWhereDTO;
  constructor(data: RemovePhoneDTO) {
    this.where = data.where;
  }
}
