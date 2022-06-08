import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCheckoutInput {
  @Field()
  checkoutId: string;
}

@InputType()
export class RemoveCheckoutInput {
  @Field(() => RemoveWhereCheckoutInput)
  where: RemoveWhereCheckoutInput;
}
