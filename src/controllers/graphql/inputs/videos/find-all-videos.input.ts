import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllVideosDTO,
  WhereDataFindAllVideosDTO
} from '@/dtos/videos/find-all-videos.dto';

@InputType()
class WhereDataFindAllVideosDataInput implements WhereDataFindAllVideosDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllVideosInput
  implements OrderByDataFindAllVideosDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllVideosInput extends WherePaginated(
  WhereDataFindAllVideosDataInput
) {}
