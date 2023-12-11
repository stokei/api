import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDataPriceInput {
  @Field(() => Int, { nullable: true })
  fromAmount?: number;

  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Boolean, { nullable: true })
  automaticRenew?: boolean;
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
