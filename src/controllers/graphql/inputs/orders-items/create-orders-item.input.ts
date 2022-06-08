import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrdersItemInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
