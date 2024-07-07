import { Injectable } from '@nestjs/common';

import {
  CompleteAccountByPaymentProcessorDTO,
  IBaseServiceCompleteAccountByPaymentProcessor
} from '@/dtos/payments-gateway/complete-account-by-gateway-processor.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodNotFoundException } from '@/errors';
import { LinkModel } from '@/models/link.model';

import { MercadoPagoCompleteAccountProcessorService } from '../../processors/mercadopago/complete-account';

@Injectable()
export class CompleteAccountByPaymentProcessorService
  implements IBaseServiceCompleteAccountByPaymentProcessor
{
  constructor(
    private readonly mercadoPagoCompleteAccountProcessorService: MercadoPagoCompleteAccountProcessorService
  ) {}

  async execute(
    data: CompleteAccountByPaymentProcessorDTO
  ): Promise<LinkModel> {
    const paymentHandlers: Record<
      PaymentGatewayType,
      IBaseServiceCompleteAccountByPaymentProcessor
    > = {
      [PaymentGatewayType.STRIPE]: undefined,
      [PaymentGatewayType.PAGARME]: undefined,
      [PaymentGatewayType.MERCADOPAGO]:
        this.mercadoPagoCompleteAccountProcessorService,
      [PaymentGatewayType.PAGSEGURO]: undefined
    };
    const completePaymentService = paymentHandlers[data?.paymentGatewayType];
    if (!completePaymentService) {
      throw new PaymentMethodNotFoundException();
    }
    return await completePaymentService.execute(data);
  }
}
