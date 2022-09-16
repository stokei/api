import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConfirmCheckoutInput {
  @Field(() => String)
  subscription: string;

  @Field(() => String)
  paymentMethod: string;
}
