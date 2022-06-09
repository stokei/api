import { ICommand } from '@nestjs/cqrs';

import {
  RemovePaymentsMethodDTO,
  RemovePaymentsMethodWhereDTO
} from '@/dtos/payments-methods/remove-payments-method.dto';

export class RemovePaymentsMethodCommand
  implements ICommand, RemovePaymentsMethodDTO
{
  where: RemovePaymentsMethodWhereDTO;
  constructor(data: RemovePaymentsMethodDTO) {
    this.where = data.where;
  }
}
