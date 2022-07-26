import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { PaymentStatus } from '@/controllers/graphql/enums/payment-status.enum';
import {
  OrderByDataFindAllPaymentsDTO,
  WhereDataFindAllPaymentsDTO
} from '@/dtos/payments/find-all-payments.dto';

@InputType()
class WhereDataFindAllPaymentsDataInput implements WhereDataFindAllPaymentsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  customer?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  order?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  externalPayment?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  paymentMethod?: WhereDataStringInput;

  @Field(() => PaymentStatus, { nullable: true })
  status?: PaymentStatus;

  @Field(() => PaymentStatus, { nullable: true })
  oldStatus?: PaymentStatus;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllPaymentsInput
  implements OrderByDataFindAllPaymentsDTO
{
  @Field(() => OrderBy, { nullable: true })
  amount?: OrderBy;

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
export class WhereDataFindAllPaymentsInput extends WherePaginated(
  WhereDataFindAllPaymentsDataInput
) {}
