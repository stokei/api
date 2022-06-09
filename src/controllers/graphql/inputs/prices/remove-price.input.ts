import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePriceInput {
  @Field()
  priceId: string;
}

@InputType()
export class RemovePriceInput {
  @Field(() => RemoveWherePriceInput)
  where: RemoveWherePriceInput;
}
