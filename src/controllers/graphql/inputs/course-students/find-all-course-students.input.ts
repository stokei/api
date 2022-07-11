import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCourseStudentsDTO,
  WhereDataFindAllCourseStudentsDTO
} from '@/dtos/course-students/find-all-course-students.dto';

@InputType()
class WhereDataFindAllCourseStudentsDataInput
  implements WhereDataFindAllCourseStudentsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCourseStudentsInput
  implements OrderByDataFindAllCourseStudentsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCourseStudentsInput extends WherePaginated(
  WhereDataFindAllCourseStudentsDataInput
) {}
