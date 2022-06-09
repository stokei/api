import { ICommand } from '@nestjs/cqrs';

import {
  RemoveAccountDTO,
  RemoveAccountWhereDTO
} from '@/dtos/accounts/remove-account.dto';

export class RemoveAccountCommand implements ICommand, RemoveAccountDTO {
  where: RemoveAccountWhereDTO;
  constructor(data: RemoveAccountDTO) {
    this.where = data.where;
  }
}
