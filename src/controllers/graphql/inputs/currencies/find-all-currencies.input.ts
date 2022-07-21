import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataIntInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCurrenciesDTO,
  WhereDataFindAllCurrenciesDTO
} from '@/dtos/currencies/find-all-currencies.dto';

@InputType()
class WhereDataFindAllCurrenciesDataInput
  implements WhereDataFindAllCurrenciesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  name?: WhereDataSearchInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  minorUnit?: WhereDataIntInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllCurrenciesInput
  implements OrderByDataFindAllCurrenciesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  minorUnit?: OrderBy;

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
export class WhereDataFindAllCurrenciesInput extends WherePaginated(
  WhereDataFindAllCurrenciesDataInput
) {}
