import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCoursesStudentsDTO,
  WhereDataFindAllCoursesStudentsDTO
} from '@/dtos/courses-students/find-all-courses-students.dto';

@InputType()
class WhereDataFindAllCoursesStudentsDataInput
  implements WhereDataFindAllCoursesStudentsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCoursesStudentsInput
  implements OrderByDataFindAllCoursesStudentsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCoursesStudentsInput extends WherePaginated(
  WhereDataFindAllCoursesStudentsDataInput
) {}
