import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllProductsImagesDTO,
  WhereDataFindAllProductsImagesDTO
} from '@/dtos/products-images/find-all-products-images.dto';

@InputType()
class WhereDataFindAllProductsImagesDataInput
  implements WhereDataFindAllProductsImagesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllProductsImagesInput
  implements OrderByDataFindAllProductsImagesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllProductsImagesInput extends WherePaginated(
  WhereDataFindAllProductsImagesDataInput
) {}
