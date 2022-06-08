import { Injectable, Scope } from '@nestjs/common';
import { FindAllPaymentsMethodsService } from '@/services/payments-methods/find-all-payments-methods';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class PaymentsMethodsLoader {
  constructor(
    private readonly paymentsMethodsService: FindAllPaymentsMethodsService
  ) {}

  readonly findByIds = new DataLoader(async (paymentsMethodIds: string[]) => {
    const paymentsMethods = await this.paymentsMethodsService.execute({
      where: {
        AND: {
          ids: paymentsMethodIds
        }
      }
    });
    const paymentsMethodsMap = new Map(
      paymentsMethods?.items?.map((paymentsMethod) => [
        paymentsMethod.id,
        paymentsMethod
      ])
    );
    return paymentsMethodIds.map((paymentsMethodId) =>
      paymentsMethodsMap.get(paymentsMethodId)
    );
  });
}
