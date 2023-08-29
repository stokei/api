import { ICommand } from '@nestjs/cqrs';

import {
  UpdatePaymentMethodDataDTO,
  UpdatePaymentMethodDTO,
  UpdatePaymentMethodWhereDTO
} from '@/dtos/payment-methods/update-payment-method.dto';

export class UpdatePaymentMethodCommand
  implements ICommand, UpdatePaymentMethodDTO
{
  data: UpdatePaymentMethodDataDTO;
  where: UpdatePaymentMethodWhereDTO;
  constructor(data: UpdatePaymentMethodDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
