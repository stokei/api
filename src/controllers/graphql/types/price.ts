import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { BillingScheme } from '@/controllers/graphql/enums/billing-scheme.enum';
import { InventoryType } from '@/controllers/graphql/enums/inventory-type.enum';
import { PriceType } from '@/controllers/graphql/enums/price-type.enum';
import { TiersMode } from '@/controllers/graphql/enums/tiers-mode.enum';

import { Account } from './account';
import { App } from './app';
import { Currency } from './currency';
import { PriceTiers } from './price-tiers';
import { Recurring } from './recurring';

@ObjectType()
export class Price {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => String, { nullable: true })
  nickname?: string;

  @Field(() => String, { nullable: true })
  unit?: string;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Float, { nullable: true })
  discountPercent?: number;

  @Field(() => Float, { nullable: true })
  fromAmount?: number;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => PriceTiers, { nullable: true })
  tiers?: PriceTiers;

  @Field(() => PriceType)
  type: PriceType;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => InventoryType, { nullable: true })
  inventoryType: InventoryType;

  @Field(() => BillingScheme, { nullable: true })
  billingScheme: BillingScheme;

  @Field(() => TiersMode, { nullable: true })
  tiersMode: TiersMode;

  @Field(() => Recurring, { nullable: true })
  recurring?: Recurring;

  @Field(() => Float)
  quantity: number;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Boolean)
  isDefault: boolean;

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
