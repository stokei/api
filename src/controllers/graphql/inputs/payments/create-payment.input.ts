import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field()
  order: string;

  @Field()
  paymentMethod: string;
}
