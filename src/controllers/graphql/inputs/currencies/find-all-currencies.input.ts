import {
  OrderByDataFindAllCurrenciesDTO,
  WhereDataFindAllCurrenciesDTO
} from '@/dtos/currencies/find-all-currencies.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllCurrenciesDataInput
  implements WhereDataFindAllCurrenciesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCurrenciesInput
  implements OrderByDataFindAllCurrenciesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCurrenciesInput extends WherePaginated(
  WhereDataFindAllCurrenciesDataInput
) {}
