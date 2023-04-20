import { Field, InputType } from '@nestjs/graphql';
import { OrderBy, WhereDataStringInput, WherePaginated } from '@stokei/nestjs';

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

  @Field(() => WhereDataStringInput, { nullable: true })
  course?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  instructor?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllCourseInstructorsInput
  implements OrderByDataFindAllCourseInstructorsDTO
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
export class WhereDataFindAllCourseInstructorsInput extends WherePaginated(
  WhereDataFindAllCourseInstructorsDataInput
) {}
