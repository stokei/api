import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  @Field(() => String)
  price: string;
}
@InputType()
export class CreateOrderInput {
  @Field(() => String, { nullable: true })
  coupon?: string;

  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}
