import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCurrencyInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCurrencyInput {
  @Field()
  currencyId: string;
}

@InputType()
export class UpdateCurrencyInput {
  @Field(() => UpdateDataCurrencyInput)
  data: UpdateDataCurrencyInput;

  @Field(() => UpdateWhereCurrencyInput)
  where: UpdateWhereCurrencyInput;
}
