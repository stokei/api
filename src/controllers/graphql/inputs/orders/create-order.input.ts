import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  app: string;

  @Field()
  cart: string;

  @Field()
  customer: string;
}
