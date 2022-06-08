import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCurrencyInput {
  @Field()
  currencyId: string;
}

@InputType()
export class RemoveCurrencyInput {
  @Field(() => RemoveWhereCurrencyInput)
  where: RemoveWhereCurrencyInput;
}
