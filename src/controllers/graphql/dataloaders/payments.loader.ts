import { Injectable, Scope } from '@nestjs/common';
import { FindAllPaymentsService } from '@/services/payments/find-all-payments';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class PaymentsLoader {
  constructor(private readonly paymentsService: FindAllPaymentsService) {}

  readonly findByIds = new DataLoader(async (paymentIds: string[]) => {
    const payments = await this.paymentsService.execute({
      where: {
        AND: {
          ids: paymentIds
        }
      }
    });
    const paymentsMap = new Map(
      payments?.items?.map((payment) => [payment.id, payment])
    );
    return paymentIds.map((paymentId) => paymentsMap.get(paymentId));
  });
}
