import { ICommand } from '@nestjs/cqrs';

import {
  RemovePaymentMethodDTO,
  RemovePaymentMethodWhereDTO
} from '@/dtos/payment-methods/remove-payment-method.dto';

export class RemovePaymentMethodCommand
  implements ICommand, RemovePaymentMethodDTO
{
  where: RemovePaymentMethodWhereDTO;
  constructor(data: RemovePaymentMethodDTO) {
    this.where = data.where;
  }
}
