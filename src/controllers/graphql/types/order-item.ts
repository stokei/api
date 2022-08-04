import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { PriceType } from '@/controllers/graphql/enums/price-type.enum';
import { RecurringType } from '@/controllers/graphql/enums/recurring-type.enum';

import { Account } from './account';
import { App } from './app';
import { Currency } from './currency';
import { Image } from './image';
import { Product } from './product';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field(() => Product)
  product: Product;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Int, { nullable: true })
  fromAmount?: number;

  @Field(() => Image, { nullable: true })
  avatar?: Image;

  @Field(() => Int)
  quantity: number;

  @Field(() => PriceType)
  type: PriceType;

  @Field(() => Int, { nullable: true })
  recurringIntervalCount: number;

  @Field(() => RecurringType)
  recurringIntervalType: RecurringType;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;

  @Field(() => App, { nullable: true })
  app?: App;
}
