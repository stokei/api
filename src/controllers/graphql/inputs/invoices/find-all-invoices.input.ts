import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { InvoiceStatus } from '@/controllers/graphql/enums/invoice-status.enum';
import {
  OrderByDataFindAllInvoicesDTO,
  WhereDataFindAllInvoicesDTO
} from '@/dtos/invoices/find-all-invoices.dto';

@InputType()
class WhereDataFindAllInvoicesDataInput implements WhereDataFindAllInvoicesDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  customer?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  subscription?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  product?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  price?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  currency?: WhereDataStringInput;

  @Field(() => InvoiceStatus, { nullable: true })
  status?: InvoiceStatus;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllInvoicesInput
  implements OrderByDataFindAllInvoicesDTO
{
  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  totalAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  subtotalAmount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  active?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  paidAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  canceledAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  paymentErrorAt?: OrderBy;

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
export class WhereDataFindAllInvoicesInput extends WherePaginated(
  WhereDataFindAllInvoicesDataInput
) {}
