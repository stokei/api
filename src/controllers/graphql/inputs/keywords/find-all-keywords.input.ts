import {
  OrderByDataFindAllKeywordsDTO,
  WhereDataFindAllKeywordsDTO
} from '@/dtos/keywords/find-all-keywords.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllKeywordsDataInput implements WhereDataFindAllKeywordsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllKeywordsInput
  implements OrderByDataFindAllKeywordsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllKeywordsInput extends WherePaginated(
  WhereDataFindAllKeywordsDataInput
) {}
