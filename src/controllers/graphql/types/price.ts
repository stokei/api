import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { InventoryType } from '@/controllers/graphql/enums/inventory-type.enum';
import { PriceType } from '@/controllers/graphql/enums/price-type.enum';
import { RecurringType } from '@/controllers/graphql/enums/recurring-type.enum';

import { Account } from './account';
import { App } from './app';
import { Currency } from './currency';
import { Product } from './product';

@ObjectType()
export class Price {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => String)
  purchaseUrl: string;

  @Field(() => Int)
  fromAmount?: number;

  @Field(() => Int)
  amount: number;

  @Field(() => PriceType)
  type: PriceType;

  @Field(() => Product)
  product: Product;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => InventoryType)
  inventoryType: InventoryType;

  @Field(() => Int)
  recurringIntervalCount: number;

  @Field(() => RecurringType)
  recurringIntervalType: RecurringType;

  @Field(() => Int)
  quantity: number;

  @Field(() => Boolean)
  active: boolean;

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
