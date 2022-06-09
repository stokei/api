import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCardsDTO,
  WhereDataFindAllCardsDTO
} from '@/dtos/cards/find-all-cards.dto';

@InputType()
class WhereDataFindAllCardsDataInput implements WhereDataFindAllCardsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCardsInput
  implements OrderByDataFindAllCardsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCardsInput extends WherePaginated(
  WhereDataFindAllCardsDataInput
) {}
