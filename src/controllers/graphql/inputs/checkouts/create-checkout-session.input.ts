import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCheckoutSessionPriceInput {
  @Field(() => String)
  price: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class CreateCheckoutSessionInput {
  @Field(() => String, { nullable: true })
  app?: string;

  @Field(() => [CreateCheckoutSessionPriceInput])
  prices: CreateCheckoutSessionPriceInput[];
}
