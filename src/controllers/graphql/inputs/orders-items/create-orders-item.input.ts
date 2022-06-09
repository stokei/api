import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrdersItemInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
