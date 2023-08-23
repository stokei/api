import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

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
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  price?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  recurring?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  product?: WhereDataSearchInput;

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
  quantity?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  totalAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  subtotalAmount?: OrderBy;

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
