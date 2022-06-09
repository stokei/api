import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomsTagsDTO,
  WhereDataFindAllClassroomsTagsDTO
} from '@/dtos/classrooms-tags/find-all-classrooms-tags.dto';

@InputType()
class WhereDataFindAllClassroomsTagsDataInput
  implements WhereDataFindAllClassroomsTagsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomsTagsInput
  implements OrderByDataFindAllClassroomsTagsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomsTagsInput extends WherePaginated(
  WhereDataFindAllClassroomsTagsDataInput
) {}
