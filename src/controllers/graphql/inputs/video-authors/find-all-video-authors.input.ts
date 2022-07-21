import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllVideoAuthorsDTO,
  WhereDataFindAllVideoAuthorsDTO
} from '@/dtos/video-authors/find-all-video-authors.dto';

@InputType()
class WhereDataFindAllVideoAuthorsDataInput
  implements WhereDataFindAllVideoAuthorsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  video?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  author?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllVideoAuthorsInput
  implements OrderByDataFindAllVideoAuthorsDTO
{
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
export class WhereDataFindAllVideoAuthorsInput extends WherePaginated(
  WhereDataFindAllVideoAuthorsDataInput
) {}
