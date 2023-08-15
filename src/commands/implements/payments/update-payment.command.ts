import { ICommand } from '@nestjs/cqrs';

import {
  UpdatePaymentDataDTO,
  UpdatePaymentDTO,
  UpdatePaymentWhereDTO
} from '@/dtos/payments/update-payment.dto';

export class UpdatePaymentCommand implements ICommand, UpdatePaymentDTO {
  data: UpdatePaymentDataDTO;
  where: UpdatePaymentWhereDTO;
  constructor(data: UpdatePaymentDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
