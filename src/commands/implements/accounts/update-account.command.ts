import { ICommand } from '@nestjs/cqrs';
import {
  UpdateAccountDTO,
  UpdateAccountDataDTO,
  UpdateAccountWhereDTO
} from '@/dtos/accounts/update-account.dto';

export class UpdateAccountCommand implements ICommand, UpdateAccountDTO {
  data: UpdateAccountDataDTO;
  where: UpdateAccountWhereDTO;
  constructor(data: UpdateAccountDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
