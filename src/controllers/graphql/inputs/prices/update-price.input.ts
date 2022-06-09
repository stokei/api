import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataPriceInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWherePriceInput {
  @Field()
  priceId: string;
}

@InputType()
export class UpdatePriceInput {
  @Field(() => UpdateDataPriceInput)
  data: UpdateDataPriceInput;

  @Field(() => UpdateWherePriceInput)
  where: UpdateWherePriceInput;
}
