import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDataPriceInput {
  @Field(() => Boolean, { nullable: true })
  default?: boolean;

  @Field(() => Int, { nullable: true })
  quantity?: number;
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
