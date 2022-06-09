import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCategoriesDTO,
  WhereDataFindAllCategoriesDTO
} from '@/dtos/categories/find-all-categories.dto';

@InputType()
class WhereDataFindAllCategoriesDataInput
  implements WhereDataFindAllCategoriesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCategoriesInput
  implements OrderByDataFindAllCategoriesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCategoriesInput extends WherePaginated(
  WhereDataFindAllCategoriesDataInput
) {}
