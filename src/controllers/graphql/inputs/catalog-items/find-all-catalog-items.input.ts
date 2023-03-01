import { Field, InputType } from '@nestjs/graphql';
import { OrderBy, WhereDataStringInput, WherePaginated } from '@stokei/nestjs';

import {
  OrderByDataFindAllCatalogItemsDTO,
  WhereDataFindAllCatalogItemsDTO
} from '@/dtos/catalog-items/find-all-catalog-items.dto';

@InputType()
class WhereDataFindAllCatalogItemsDataInput
  implements WhereDataFindAllCatalogItemsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  catalog?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  product?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllCatalogItemsInput
  implements OrderByDataFindAllCatalogItemsDTO
{
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
export class WhereDataFindAllCatalogItemsInput extends WherePaginated(
  WhereDataFindAllCatalogItemsDataInput
) {}
