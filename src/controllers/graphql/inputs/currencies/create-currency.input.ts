import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
