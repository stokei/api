import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCheckoutsCurrencyInput {
  @Field()
  checkoutsCurrencyId: string;
}

@InputType()
export class RemoveCheckoutsCurrencyInput {
  @Field(() => RemoveWhereCheckoutsCurrencyInput)
  where: RemoveWhereCheckoutsCurrencyInput;
}
