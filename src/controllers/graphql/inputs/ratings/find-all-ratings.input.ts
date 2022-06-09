import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllRatingsDTO,
  WhereDataFindAllRatingsDTO
} from '@/dtos/ratings/find-all-ratings.dto';

@InputType()
class WhereDataFindAllRatingsDataInput implements WhereDataFindAllRatingsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllRatingsInput
  implements OrderByDataFindAllRatingsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllRatingsInput extends WherePaginated(
  WhereDataFindAllRatingsDataInput
) {}
