import { Injectable } from '@nestjs/common';

import { stripeClient } from '@/clients/stripe';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { BalanceModel } from '@/models/balance.model';

@Injectable()
export class FindStripeBalanceService {
  async execute(
    currency: string,
    stripeAccount: string
  ): Promise<BalanceModel> {
    const response = await stripeClient.balance.retrieve({
      stripeAccount
    });
    const balanceAvailable = response?.available?.find(
      (available) => available.currency?.match(new RegExp(currency, 'i'))
    )?.amount;
    const balancePending = response?.pending?.find(
      (pending) => pending.currency?.match(new RegExp(currency, 'i'))
    )?.amount;
    return new BalanceModel({
      paymentGatewayType: PaymentGatewayType.STRIPE,
      currency,
      availableAmount: balanceAvailable,
      pendingAmount: balancePending
    });
  }
}
