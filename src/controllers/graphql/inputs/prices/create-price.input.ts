import { Field, InputType, Int } from '@nestjs/graphql';

import { InventoryType } from '@/controllers/graphql/enums/inventory-type.enum';
import { PriceType } from '@/controllers/graphql/enums/price-type.enum';
import { RecurringType } from '@/controllers/graphql/enums/recurring-type.enum';

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

  @Field(() => InventoryType)
  inventoryType: InventoryType;

  @Field(() => Int)
  recurringIntervalCount: number;

  @Field(() => RecurringType)
  recurringIntervalType: RecurringType;

  @Field(() => Int)
  quantity: number;
}
