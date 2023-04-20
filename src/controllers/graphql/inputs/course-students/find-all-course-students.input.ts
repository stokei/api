import { Field, InputType } from '@nestjs/graphql';
import { OrderBy, WhereDataStringInput, WherePaginated } from '@stokei/nestjs';

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

  @Field(() => WhereDataStringInput, { nullable: true })
  course?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  student?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllCourseStudentsInput
  implements OrderByDataFindAllCourseStudentsDTO
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
export class WhereDataFindAllCourseStudentsInput extends WherePaginated(
  WhereDataFindAllCourseStudentsDataInput
) {}
