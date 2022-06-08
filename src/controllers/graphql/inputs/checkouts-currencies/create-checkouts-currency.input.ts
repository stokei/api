import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCheckoutsCurrencyInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
