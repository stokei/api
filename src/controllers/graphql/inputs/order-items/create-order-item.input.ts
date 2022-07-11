import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
