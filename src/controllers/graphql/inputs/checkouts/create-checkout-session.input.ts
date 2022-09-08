import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCheckoutSessionPriceInput {
  @Field(() => String)
  price: string;
}

@InputType()
export class CreateCheckoutSessionInput {
  @Field(() => String, { nullable: true })
  app?: string;

  @Field(() => [CreateCheckoutSessionPriceInput])
  prices: CreateCheckoutSessionPriceInput[];
}
