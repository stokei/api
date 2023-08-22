import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  @Field(() => String)
  price: string;
}
@InputType()
export class CreateOrderInput {
  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}
