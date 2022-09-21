import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllPaymentMethodsDTO,
  WhereDataFindAllPaymentMethodsDTO
} from '@/dtos/payment-methods/find-all-payment-methods.dto';

@InputType()
class WhereDataFindAllPaymentMethodsDataInput
  implements WhereDataFindAllPaymentMethodsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllPaymentMethodsInput
  implements OrderByDataFindAllPaymentMethodsDTO
{
  @Field(() => OrderBy, { nullable: true })
  type?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  provider?: OrderBy;

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
export class WhereDataFindAllPaymentMethodsInput extends WherePaginated(
  WhereDataFindAllPaymentMethodsDataInput
) {}
