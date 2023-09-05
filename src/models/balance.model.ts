import { AggregateRoot } from '@nestjs/cqrs';

import { PaymentGatewayType } from '@/controllers/graphql/enums/payment-gateway-type.enum';

export interface IBalanceModelData {
  readonly paymentGatewayType: PaymentGatewayType;
  readonly currency: string;
  readonly availableAmount: number;
  readonly pendingAmount: number;
}

export class BalanceModel extends AggregateRoot {
  readonly paymentGatewayType: PaymentGatewayType;
  readonly currency: string;
  readonly availableAmount: number;
  readonly pendingAmount: number;

  constructor(data: IBalanceModelData) {
    super();

    this.paymentGatewayType = data.paymentGatewayType;
    this.currency = data.currency;
    this.availableAmount = data.availableAmount || 0;
    this.pendingAmount = data.pendingAmount || 0;
  }
}
