import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrdersAddressInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
