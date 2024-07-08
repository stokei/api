import { Query, Resolver } from '@nestjs/graphql';

import { allPaymentGateways } from '@/constants/payment-gateways';
import { PaymentGateway } from '@/controllers/graphql/types/payment-gateway';

@Resolver(() => PaymentGateway)
export class PaymentGatewaysResolver {
  @Query(() => [PaymentGateway])
  async paymentGateways() {
    return allPaymentGateways;
  }
}
