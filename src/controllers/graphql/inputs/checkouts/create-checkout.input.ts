import { Field, InputType } from '@nestjs/graphql';

import { PaymentMethodType } from '@/controllers/graphql/enums/payment-method-type.enum';

@InputType()
export class CreateCheckoutInput {
  @Field(() => String)
  order: string;

  @Field(() => String)
  address: string;

  @Field(() => PaymentMethodType)
  paymentMethodType: PaymentMethodType;

  @Field(() => String, { nullable: true })
  paymentMethod?: string;
}
