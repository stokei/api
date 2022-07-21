import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field(() => Int)
  minorUnit: number;
}
