import { Field, InputType } from '@nestjs/graphql';

import { PaymentGatewayType } from '@/controllers/graphql/enums/payment-gateway-type.enum';

@InputType()
export class CreateCheckoutInput {
  @Field(() => String)
  order: string;

  @Field(() => String)
  successURL: string;

  @Field(() => String)
  cancelURL: string;

  @Field(() => PaymentGatewayType)
  paymentGatewayType: PaymentGatewayType;
}
