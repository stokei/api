import { Field, Float, ObjectType } from '@nestjs/graphql';

import { BillingItem } from './billing-item';
import { Currency } from './currency';

@ObjectType()
export class Billing {
  @Field(() => Float, { nullable: true })
  total: number;

  @Field(() => [BillingItem], { nullable: true })
  items?: BillingItem[];

  @Field(() => Currency, { nullable: true })
  currency?: Currency;
}
