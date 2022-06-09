import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCartsItemsDTO,
  WhereDataFindAllCartsItemsDTO
} from '@/dtos/carts-items/find-all-carts-items.dto';

@InputType()
class WhereDataFindAllCartsItemsDataInput
  implements WhereDataFindAllCartsItemsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCartsItemsInput
  implements OrderByDataFindAllCartsItemsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCartsItemsInput extends WherePaginated(
  WhereDataFindAllCartsItemsDataInput
) {}
