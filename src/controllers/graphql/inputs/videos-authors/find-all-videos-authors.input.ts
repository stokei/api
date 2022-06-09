import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllVideosAuthorsDTO,
  WhereDataFindAllVideosAuthorsDTO
} from '@/dtos/videos-authors/find-all-videos-authors.dto';

@InputType()
class WhereDataFindAllVideosAuthorsDataInput
  implements WhereDataFindAllVideosAuthorsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllVideosAuthorsInput
  implements OrderByDataFindAllVideosAuthorsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllVideosAuthorsInput extends WherePaginated(
  WhereDataFindAllVideosAuthorsDataInput
) {}
