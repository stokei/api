import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
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

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  name?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  slug?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  description?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  private?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllVideosInput
  implements OrderByDataFindAllVideosDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  slug?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  active?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  private?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdBy?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedBy?: OrderBy;
}

@InputType()
export class WhereDataFindAllVideosInput extends WherePaginated(
  WhereDataFindAllVideosDataInput
) {}
