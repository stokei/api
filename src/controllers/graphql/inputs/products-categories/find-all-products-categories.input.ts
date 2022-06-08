import {
  OrderByDataFindAllProductsCategoriesDTO,
  WhereDataFindAllProductsCategoriesDTO
} from '@/dtos/products-categories/find-all-products-categories.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllProductsCategoriesDataInput
  implements WhereDataFindAllProductsCategoriesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllProductsCategoriesInput
  implements OrderByDataFindAllProductsCategoriesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllProductsCategoriesInput extends WherePaginated(
  WhereDataFindAllProductsCategoriesDataInput
) {}
