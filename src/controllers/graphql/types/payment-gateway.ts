import { Field, ObjectType } from '@nestjs/graphql';

import { PaymentGatewayType } from '@/controllers/graphql/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/controllers/graphql/enums/payment-method-type.enum';

@ObjectType()
export class PaymentGateway {
  @Field(() => PaymentGatewayType)
  type: PaymentGatewayType;

  @Field(() => [PaymentMethodType])
  paymentMethods: PaymentMethodType[];
}
