import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllPaymentsMethodsDTO,
  WhereDataFindAllPaymentsMethodsDTO
} from '@/dtos/payments-methods/find-all-payments-methods.dto';

@InputType()
class WhereDataFindAllPaymentsMethodsDataInput
  implements WhereDataFindAllPaymentsMethodsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllPaymentsMethodsInput
  implements OrderByDataFindAllPaymentsMethodsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllPaymentsMethodsInput extends WherePaginated(
  WhereDataFindAllPaymentsMethodsDataInput
) {}
