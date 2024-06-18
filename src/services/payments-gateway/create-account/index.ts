import { Injectable } from '@nestjs/common';

import {
  CreateAccountByPaymentProcessorDTO,
  IBaseServiceCreateAccountByPaymentProcessor
} from '@/dtos/payments-gateway/create-account-by-gateway-processor.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodNotFoundException } from '@/errors';
import { LinkModel } from '@/models/link.model';

import { StripeCreateAccountProcessorService } from '../processors/stripe/create-account';

@Injectable()
export class CreateAccountByPaymentProcessorService
  implements IBaseServiceCreateAccountByPaymentProcessor
{
  constructor(
    private readonly stripeCreateAccountProcessorService: StripeCreateAccountProcessorService
  ) {}

  async execute(data: CreateAccountByPaymentProcessorDTO): Promise<LinkModel> {
    const paymentHandlers: Record<
      PaymentGatewayType,
      IBaseServiceCreateAccountByPaymentProcessor
    > = {
      [PaymentGatewayType.STRIPE]: this.stripeCreateAccountProcessorService,
      [PaymentGatewayType.PAGARME]: this.stripeCreateAccountProcessorService
    };
    const createPaymentService = paymentHandlers[data?.paymentGatewayType];
    if (!createPaymentService) {
      throw new PaymentMethodNotFoundException();
    }
    return await createPaymentService.execute(data);
  }
}
