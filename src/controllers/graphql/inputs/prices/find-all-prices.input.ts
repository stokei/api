import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataIntInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { IntervalType } from '@/controllers/graphql/enums/interval-type.enum';
import { InventoryType } from '@/controllers/graphql/enums/inventory-type.enum';
import { PriceType } from '@/controllers/graphql/enums/price-type.enum';
import {
  OrderByDataFindAllPricesDTO,
  WhereDataFindAllPricesDTO
} from '@/dtos/prices/find-all-prices.dto';

@InputType()
class WhereDataFindAllPricesDataInput implements WhereDataFindAllPricesDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => PriceType, { nullable: true })
  type?: PriceType;

  @Field(() => InventoryType, { nullable: true })
  inventoryType?: InventoryType;

  @Field(() => WhereDataIntInput, { nullable: true })
  recurringIntervalCount?: WhereDataIntInput;

  @Field(() => IntervalType, { nullable: true })
  recurringIntervalType?: IntervalType;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllPricesInput
  implements OrderByDataFindAllPricesDTO
{
  @Field(() => OrderBy, { nullable: true })
  default?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  fromAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  amount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  type?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  inventoryType?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  recurringIntervalCount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  recurringIntervalType?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantity?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdBy?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedBy?: OrderBy;
}

@InputType()
export class WhereDataFindAllPricesInput extends WherePaginated(
  WhereDataFindAllPricesDataInput
) {}
