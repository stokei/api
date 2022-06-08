import {
  OrderByDataFindAllOrdersItemsDTO,
  WhereDataFindAllOrdersItemsDTO
} from '@/dtos/orders-items/find-all-orders-items.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllOrdersItemsDataInput
  implements WhereDataFindAllOrdersItemsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllOrdersItemsInput
  implements OrderByDataFindAllOrdersItemsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllOrdersItemsInput extends WherePaginated(
  WhereDataFindAllOrdersItemsDataInput
) {}
