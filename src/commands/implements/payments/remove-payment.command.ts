import { ICommand } from '@nestjs/cqrs';

import {
  RemovePaymentDTO,
  RemovePaymentWhereDTO
} from '@/dtos/payments/remove-payment.dto';

export class RemovePaymentCommand implements ICommand, RemovePaymentDTO {
  where: RemovePaymentWhereDTO;
  constructor(data: RemovePaymentDTO) {
    this.where = data.where;
  }
}
