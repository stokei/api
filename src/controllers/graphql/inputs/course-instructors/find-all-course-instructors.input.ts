import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCourseInstructorsDTO,
  WhereDataFindAllCourseInstructorsDTO
} from '@/dtos/course-instructors/find-all-course-instructors.dto';

@InputType()
class WhereDataFindAllCourseInstructorsDataInput
  implements WhereDataFindAllCourseInstructorsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCourseInstructorsInput
  implements OrderByDataFindAllCourseInstructorsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCourseInstructorsInput extends WherePaginated(
  WhereDataFindAllCourseInstructorsDataInput
) {}
