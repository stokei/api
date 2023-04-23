import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCheckoutInput {
  @Field(() => String, { nullable: true })
  customer?: string;

  @Field(() => String)
  price: string;

  @Field(() => String)
  paymentMethod: string;
}
