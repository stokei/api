import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCheckoutsCurrencyInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
