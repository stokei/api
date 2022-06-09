import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllProductsTagsDTO,
  WhereDataFindAllProductsTagsDTO
} from '@/dtos/products-tags/find-all-products-tags.dto';

@InputType()
class WhereDataFindAllProductsTagsDataInput
  implements WhereDataFindAllProductsTagsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllProductsTagsInput
  implements OrderByDataFindAllProductsTagsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllProductsTagsInput extends WherePaginated(
  WhereDataFindAllProductsTagsDataInput
) {}
