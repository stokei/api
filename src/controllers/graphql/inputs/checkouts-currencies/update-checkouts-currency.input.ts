import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataCheckoutsCurrencyInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCheckoutsCurrencyInput {
  @Field()
  checkoutsCurrencyId: string;
}

@InputType()
export class UpdateCheckoutsCurrencyInput {
  @Field(() => UpdateDataCheckoutsCurrencyInput)
  data: UpdateDataCheckoutsCurrencyInput;

  @Field(() => UpdateWhereCheckoutsCurrencyInput)
  where: UpdateWhereCheckoutsCurrencyInput;
}
