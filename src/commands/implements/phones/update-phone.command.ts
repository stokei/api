import { ICommand } from '@nestjs/cqrs';

import {
  UpdatePhoneDataDTO,
  UpdatePhoneDTO,
  UpdatePhoneWhereDTO
} from '@/dtos/phones/update-phone.dto';

export class UpdatePhoneCommand implements ICommand, UpdatePhoneDTO {
  data: UpdatePhoneDataDTO;
  where: UpdatePhoneWhereDTO;
  constructor(data: UpdatePhoneDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
