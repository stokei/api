import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentMethodInput {
  @Field()
  stripePaymentMethod: string;
}
