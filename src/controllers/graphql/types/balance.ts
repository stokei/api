import { Field, Float, ObjectType } from '@nestjs/graphql';

import { PaymentGatewayType } from '@/controllers/graphql/enums/payment-gateway-type.enum';

import { Currency } from './currency';

@ObjectType()
export class Balance {
  @Field(() => Currency, { nullable: true })
  currency: Currency;

  @Field(() => PaymentGatewayType)
  paymentGatewayType: PaymentGatewayType;

  @Field(() => Float, { nullable: true })
  availableAmount: number;

  @Field(() => Float, { nullable: true })
  pendingAmount: number;
}
