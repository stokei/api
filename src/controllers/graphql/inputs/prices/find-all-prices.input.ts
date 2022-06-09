import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllPricesDTO,
  WhereDataFindAllPricesDTO
} from '@/dtos/prices/find-all-prices.dto';

@InputType()
class WhereDataFindAllPricesDataInput implements WhereDataFindAllPricesDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllPricesInput
  implements OrderByDataFindAllPricesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllPricesInput extends WherePaginated(
  WhereDataFindAllPricesDataInput
) {}
