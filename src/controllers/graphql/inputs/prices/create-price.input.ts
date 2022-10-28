import { Field, InputType, Int } from '@nestjs/graphql';

import { BillingScheme } from '@/controllers/graphql/enums/billing-scheme.enum';
import { InventoryType } from '@/controllers/graphql/enums/inventory-type.enum';
import { PriceType } from '@/controllers/graphql/enums/price-type.enum';
import { TiersMode } from '@/controllers/graphql/enums/tiers-mode.enum';
import { Recurring } from '@/controllers/graphql/types/recurring';

@InputType()
export class CreatePriceInput {
  @Field(() => String)
  parent: string;

  @Field(() => Boolean, { nullable: true })
  default?: boolean;

  @Field(() => Int, { nullable: true })
  fromAmount?: number;

  @Field(() => Int)
  amount: number;

  @Field(() => PriceType)
  type: PriceType;

  @Field(() => BillingScheme)
  billingScheme: BillingScheme;

  @Field(() => TiersMode)
  tiersMode: TiersMode;

  @Field(() => InventoryType)
  inventoryType: InventoryType;

  @Field(() => Recurring, { nullable: true })
  recurring?: Recurring;

  @Field(() => Int)
  quantity: number;
}
