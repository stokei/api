import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrdersSellerInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
