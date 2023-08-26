import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataSearchInput,
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

  @Field(() => WhereDataSearchInput, { nullable: true })
  payer?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  currency?: WhereDataStringInput;

  @Field(() => PaymentStatus, { nullable: true })
  status?: PaymentStatus;

  @Field(() => WhereDataStringInput, { nullable: true })
  paymentMethod?: WhereDataStringInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

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
  currency?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  paymentMethod?: OrderBy;

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
export class WhereDataFindAllPaymentsInput extends WherePaginated(
  WhereDataFindAllPaymentsDataInput
) {}
