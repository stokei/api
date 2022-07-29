import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDataCurrencyInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  symbol?: string;

  @Field(() => Int, { nullable: true })
  minorUnit?: number;
}

@InputType()
export class UpdateWhereCurrencyInput {
  @Field()
  currency: string;
}

@InputType()
export class UpdateCurrencyInput {
  @Field(() => UpdateDataCurrencyInput)
  data: UpdateDataCurrencyInput;

  @Field(() => UpdateWhereCurrencyInput)
  where: UpdateWhereCurrencyInput;
}
