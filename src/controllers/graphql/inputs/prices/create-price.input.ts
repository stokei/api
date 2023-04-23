import { Field, InputType, Int } from '@nestjs/graphql';

import { BillingScheme } from '@/controllers/graphql/enums/billing-scheme.enum';
import { InventoryType } from '@/controllers/graphql/enums/inventory-type.enum';
import { PriceType } from '@/controllers/graphql/enums/price-type.enum';
import { TiersMode } from '@/controllers/graphql/enums/tiers-mode.enum';
import { CreatePriceTierInput } from '@/controllers/graphql/inputs/price-tiers/create-price-tier.input';
import { CreateRecurringInput } from '@/controllers/graphql/inputs/recurrings/create-recurring.input';

@InputType()
export class CreatePriceInput {
  @Field(() => String)
  parent: string;

  @Field(() => Int, { nullable: true })
  fromAmount?: number;

  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  nickname?: string;

  @Field(() => Boolean, { nullable: true })
  defaultPrice?: boolean;

  @Field(() => String, { nullable: true })
  unit?: string;

  @Field(() => PriceType)
  type: PriceType;

  @Field(() => BillingScheme)
  billingScheme: BillingScheme;

  @Field(() => TiersMode)
  tiersMode: TiersMode;

  @Field(() => InventoryType)
  inventoryType: InventoryType;

  @Field(() => CreateRecurringInput, { nullable: true })
  recurring?: CreateRecurringInput;

  @Field(() => [CreatePriceTierInput], { nullable: true })
  tiers?: CreatePriceTierInput[];

  @Field(() => Int, { nullable: true })
  quantity?: number;
}
