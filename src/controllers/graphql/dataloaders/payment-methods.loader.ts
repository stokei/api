import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllPaymentMethodsService } from '@/services/payment-methods/find-all-payment-methods';

@Injectable({ scope: Scope.REQUEST })
export class PaymentMethodsLoader {
  constructor(
    private readonly paymentMethodsService: FindAllPaymentMethodsService
  ) {}

  readonly findByIds = new DataLoader(async (paymentMethodIds: string[]) => {
    const paymentMethods = await this.paymentMethodsService.execute({
      where: {
        AND: {
          ids: paymentMethodIds
        }
      }
    });
    const paymentMethodsMap = new Map(
      paymentMethods?.items?.map((paymentMethod) => [
        paymentMethod.id,
        paymentMethod
      ])
    );
    return paymentMethodIds.map((paymentMethodId) =>
      paymentMethodsMap.get(paymentMethodId)
    );
  });
}
