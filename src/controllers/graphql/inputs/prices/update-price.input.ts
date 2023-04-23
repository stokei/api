import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDataPriceInput {
  @Field(() => Int, { nullable: true })
  fromAmount?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;
}

@InputType()
export class UpdateWherePriceInput {
  @Field()
  price: string;
}

@InputType()
export class UpdatePriceInput {
  @Field(() => UpdateDataPriceInput)
  data: UpdateDataPriceInput;

  @Field(() => UpdateWherePriceInput)
  where: UpdateWherePriceInput;
}
