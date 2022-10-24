import { Field, InputType, Int } from '@nestjs/graphql';

import { InventoryType } from '@/controllers/graphql/enums/inventory-type.enum';
import { PriceType } from '@/controllers/graphql/enums/price-type.enum';
import { IntervalType } from '@/controllers/graphql/enums/interval-type.enum';

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

  @Field(() => IntervalType)
  recurringIntervalType: IntervalType;

  @Field(() => Int)
  quantity: number;
}
