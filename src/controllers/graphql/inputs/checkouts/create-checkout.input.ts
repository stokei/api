import { Field, InputType } from '@nestjs/graphql';

import { PaymentMethodType } from '@/controllers/graphql/enums/payment-method-type.enum';

@InputType()
export class CreateCheckoutInput {
  @Field(() => String)
  order: string;

  @Field(() => PaymentMethodType)
  paymentMethodType: PaymentMethodType;
}
