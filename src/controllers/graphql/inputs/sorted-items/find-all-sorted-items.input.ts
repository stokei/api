import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllSortedItemsDTO,
  WhereDataFindAllSortedItemsDTO
} from '@/dtos/sorted-items/find-all-sorted-items.dto';

@InputType()
class WhereDataFindAllSortedItemsDataInput
  implements WhereDataFindAllSortedItemsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllSortedItemsInput
  implements OrderByDataFindAllSortedItemsDTO
{
  @Field(() => OrderBy, { nullable: true })
  index?: OrderBy;
}

@InputType()
export class WhereDataFindAllSortedItemsInput extends WherePaginated(
  WhereDataFindAllSortedItemsDataInput
) {}
