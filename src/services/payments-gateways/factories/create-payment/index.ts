import { Injectable } from '@nestjs/common';

import {
  CreatePaymentByPaymentProcessorDTO,
  IBaseServiceCreatePaymentByPaymentProcessor
} from '@/dtos/payments-gateway/create-payment-by-gateway-processor.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodNotFoundException } from '@/errors';
import { CheckoutModel } from '@/models/checkout.model';

import { MercadoPagoCreatePaymentProcessorService } from '../../processors/mercadopago/create-payment';
import { PagarmeCreatePaymentProcessorService } from '../../processors/pagarme/create-payment';
import { StripeCreatePaymentProcessorService } from '../../processors/stripe/create-payment';

@Injectable()
export class CreatePaymentByPaymentProcessorService
  implements IBaseServiceCreatePaymentByPaymentProcessor
{
  constructor(
    private readonly stripeCreatePaymentProcessorService: StripeCreatePaymentProcessorService,
    private readonly pagarmeCreatePaymentProcessorService: PagarmeCreatePaymentProcessorService,
    private readonly mercadoPagoCreatePaymentProcessorService: MercadoPagoCreatePaymentProcessorService
  ) {}

  async execute(
    data: CreatePaymentByPaymentProcessorDTO
  ): Promise<CheckoutModel> {
    const paymentHandlers: Record<
      PaymentGatewayType,
      IBaseServiceCreatePaymentByPaymentProcessor
    > = {
      [PaymentGatewayType.STRIPE]: this.stripeCreatePaymentProcessorService,
      [PaymentGatewayType.PAGARME]: this.pagarmeCreatePaymentProcessorService,
      [PaymentGatewayType.MERCADOPAGO]:
        this.mercadoPagoCreatePaymentProcessorService,
      [PaymentGatewayType.PAGSEGURO]: undefined
    };
    const createPaymentService = paymentHandlers[data?.paymentGatewayType];
    if (!createPaymentService) {
      throw new PaymentMethodNotFoundException();
    }
    return await createPaymentService.execute(data);
  }
}
