import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { AppNotFoundException, DataNotFoundException } from '@/errors';
import { BalanceModel } from '@/models/balance.model';
import { FindAppBalancesQuery } from '@/queries/implements/apps/find-app-balances.query';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindPagarmeBalanceService } from '@/services/pagarme/find-pagarme-balance';
import { FindStripeBalanceService } from '@/services/stripe/find-stripe-balance';

@QueryHandler(FindAppBalancesQuery)
export class FindAppBalancesQueryHandler
  implements IQueryHandler<FindAppBalancesQuery>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findPagarmeBalanceService: FindPagarmeBalanceService,
    private readonly findStripeBalanceService: FindStripeBalanceService
  ) {}

  async execute(query: FindAppBalancesQuery): Promise<BalanceModel[]> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const appId = cleanValue(query.app);
    if (!appId) {
      return;
    }
    const app = await this.findAppByIdService.execute(appId);
    if (!app) {
      throw new AppNotFoundException();
    }

    const emptyStripeBalance = new BalanceModel({
      currency: app.currency,
      paymentGatewayType: PaymentGatewayType.STRIPE,
      availableAmount: 0,
      pendingAmount: 0
    });
    const emptyPagarmeBalance = new BalanceModel({
      currency: app.currency,
      paymentGatewayType: PaymentGatewayType.PAGARME,
      availableAmount: 0,
      pendingAmount: 0
    });
    const pagarmeBalance = await this.getPaymentGatewayBalance({
      handleFunction: () =>
        this.findPagarmeBalanceService.execute(app.pagarmeAccount),
      emptyBalance: emptyPagarmeBalance
    });
    const stripeBalance = await this.getPaymentGatewayBalance({
      handleFunction: () =>
        this.findStripeBalanceService.execute(app.currency, app.stripeAccount),
      emptyBalance: emptyStripeBalance
    });
    return [stripeBalance, pagarmeBalance];
  }

  async getPaymentGatewayBalance({
    emptyBalance,
    handleFunction
  }: {
    handleFunction: () => Promise<BalanceModel>;
    emptyBalance: BalanceModel;
  }) {
    try {
      const balance = await handleFunction();
      if (balance) {
        return balance;
      } else {
        return emptyBalance;
      }
    } catch (error) {
      return emptyBalance;
    }
  }
}
