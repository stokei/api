import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentMethodCardInput {
  @Field(() => String)
  cardHash: string;

  @Field(() => String)
  address: string;
}
