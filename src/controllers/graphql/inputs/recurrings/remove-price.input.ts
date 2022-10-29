import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePriceInput {
  @Field()
  price: string;
}

@InputType()
export class RemovePriceInput {
  @Field(() => RemoveWherePriceInput)
  where: RemoveWherePriceInput;
}
