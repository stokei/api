import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataIntInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { PriceType } from '@/controllers/graphql/enums/price-type.enum';
import { RecurringType } from '@/controllers/graphql/enums/recurring-type.enum';
import {
  OrderByDataFindAllOrderItemsDTO,
  WhereDataFindAllOrderItemsDTO
} from '@/dtos/order-items/find-all-order-items.dto';

@InputType()
class WhereDataFindAllOrderItemsDataInput
  implements WhereDataFindAllOrderItemsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  name?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  order?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  product?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  description?: WhereDataSearchInput;

  @Field(() => PriceType, { nullable: true })
  type?: PriceType;

  @Field(() => WhereDataIntInput, { nullable: true })
  recurringIntervalCount?: WhereDataIntInput;

  @Field(() => RecurringType, { nullable: true })
  recurringIntervalType?: RecurringType;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllOrderItemsInput
  implements OrderByDataFindAllOrderItemsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  type?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantity?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  recurringIntervalCount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  recurringIntervalType?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  amount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  fromAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  toAmount?: OrderBy;

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
export class WhereDataFindAllOrderItemsInput extends WherePaginated(
  WhereDataFindAllOrderItemsDataInput
) {}
