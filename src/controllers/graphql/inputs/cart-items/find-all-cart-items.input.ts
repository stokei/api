import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCartItemsDTO,
  WhereDataFindAllCartItemsDTO
} from '@/dtos/cart-items/find-all-cart-items.dto';

@InputType()
class WhereDataFindAllCartItemsDataInput
  implements WhereDataFindAllCartItemsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCartItemsInput
  implements OrderByDataFindAllCartItemsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCartItemsInput extends WherePaginated(
  WhereDataFindAllCartItemsDataInput
) {}
