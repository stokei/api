import { Field, Float, ObjectType } from '@nestjs/graphql';

import { Price } from './price';

@ObjectType()
export class BillingItem {
  @Field(() => Float, { nullable: true })
  total: number;

  @Field(() => Float, { nullable: true })
  quantity: number;

  @Field(() => Float, { nullable: true })
  unitAmount: number;

  @Field(() => Price, { nullable: true })
  price?: Price;
}
