import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { OrderStatus } from '@/controllers/graphql/enums/order-status.enum';
import {
  OrderByDataFindAllOrdersDTO,
  WhereDataFindAllOrdersDTO
} from '@/dtos/orders/find-all-orders.dto';

@InputType()
class WhereDataFindAllOrdersDataInput implements WhereDataFindAllOrdersDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  coupon?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  currency?: WhereDataStringInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllOrdersInput
  implements OrderByDataFindAllOrdersDTO
{
  @Field(() => OrderBy, { nullable: true })
  currency?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  paidAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  totalAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  subtotalAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  feeAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  active?: OrderBy;

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
export class WhereDataFindAllOrdersInput extends WherePaginated(
  WhereDataFindAllOrdersDataInput
) {}
