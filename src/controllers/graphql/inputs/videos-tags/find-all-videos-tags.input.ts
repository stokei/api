import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllVideosTagsDTO,
  WhereDataFindAllVideosTagsDTO
} from '@/dtos/videos-tags/find-all-videos-tags.dto';

@InputType()
class WhereDataFindAllVideosTagsDataInput
  implements WhereDataFindAllVideosTagsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllVideosTagsInput
  implements OrderByDataFindAllVideosTagsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllVideosTagsInput extends WherePaginated(
  WhereDataFindAllVideosTagsDataInput
) {}
