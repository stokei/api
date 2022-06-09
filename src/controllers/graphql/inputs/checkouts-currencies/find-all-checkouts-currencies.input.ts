import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCheckoutsCurrenciesDTO,
  WhereDataFindAllCheckoutsCurrenciesDTO
} from '@/dtos/checkouts-currencies/find-all-checkouts-currencies.dto';

@InputType()
class WhereDataFindAllCheckoutsCurrenciesDataInput
  implements WhereDataFindAllCheckoutsCurrenciesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCheckoutsCurrenciesInput
  implements OrderByDataFindAllCheckoutsCurrenciesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCheckoutsCurrenciesInput extends WherePaginated(
  WhereDataFindAllCheckoutsCurrenciesDataInput
) {}
