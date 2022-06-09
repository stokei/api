import { ICommand } from '@nestjs/cqrs';

import {
  UpdatePaymentsMethodDataDTO,
  UpdatePaymentsMethodDTO,
  UpdatePaymentsMethodWhereDTO
} from '@/dtos/payments-methods/update-payments-method.dto';

export class UpdatePaymentsMethodCommand
  implements ICommand, UpdatePaymentsMethodDTO
{
  data: UpdatePaymentsMethodDataDTO;
  where: UpdatePaymentsMethodWhereDTO;
  constructor(data: UpdatePaymentsMethodDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
