import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
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

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  cart?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  customer?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  currency?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  status?: OrderStatus;

  @Field(() => WhereDataStringInput, { nullable: true })
  oldStatus?: OrderStatus;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

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
  applicationFeePercentage?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  applicationFeeAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  currency?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  amount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  discountAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  subtotalAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  totalAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  oldStatus?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  active?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  paidAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  canceledAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  paymentErrorAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  totalRefundedAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  parcialRefundedAt?: OrderBy;

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
