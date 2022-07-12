import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
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

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;

  @Field({ nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field({ nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllPaymentMethodsInput
  implements OrderByDataFindAllPaymentMethodsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllPaymentMethodsInput extends WherePaginated(
  WhereDataFindAllPaymentMethodsDataInput
) {}
