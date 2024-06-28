import { Injectable } from '@nestjs/common';

import {
  FindPaymentByPaymentProcessorDTO,
  FindPaymentByPaymentProcessorResponse,
  IBaseServiceFindPaymentByPaymentProcessor
} from '@/dtos/payments-gateway/find-payment-by-gateway-processor.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodNotFoundException } from '@/errors';

import { MercadoPagoFindPaymentProcessorService } from '../../processors/mercadopago/find-payment';

@Injectable()
export class FindPaymentByPaymentProcessorService
  implements IBaseServiceFindPaymentByPaymentProcessor
{
  constructor(
    private readonly mercadoPagoFindPaymentProcessorService: MercadoPagoFindPaymentProcessorService
  ) {}

  async execute(
    data: FindPaymentByPaymentProcessorDTO
  ): Promise<FindPaymentByPaymentProcessorResponse> {
    const paymentHandlers: Record<
      PaymentGatewayType,
      IBaseServiceFindPaymentByPaymentProcessor
    > = {
      [PaymentGatewayType.STRIPE]: undefined,
      [PaymentGatewayType.PAGARME]: undefined,
      [PaymentGatewayType.MERCADOPAGO]:
        this.mercadoPagoFindPaymentProcessorService,
      [PaymentGatewayType.PAGSEGURO]: undefined
    };
    const findPaymentService = paymentHandlers[data?.paymentGatewayType];
    if (!findPaymentService) {
      throw new PaymentMethodNotFoundException();
    }
    return await findPaymentService.execute(data);
  }
}
