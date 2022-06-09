import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllPaymentsDTO,
  WhereDataFindAllPaymentsDTO
} from '@/dtos/payments/find-all-payments.dto';

@InputType()
class WhereDataFindAllPaymentsDataInput implements WhereDataFindAllPaymentsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllPaymentsInput
  implements OrderByDataFindAllPaymentsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllPaymentsInput extends WherePaginated(
  WhereDataFindAllPaymentsDataInput
) {}
