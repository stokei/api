import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Currency } from './currency';

@ObjectType()
export class CalculatePlanPriceResponse {
  @Field(() => Int)
  totalPriceAmount: number;

  @Field(() => Int)
  applicationFeePercentage: number;

  @Field(() => Currency)
  currency: Currency;
}
