import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCoursesInstructorsDTO,
  WhereDataFindAllCoursesInstructorsDTO
} from '@/dtos/courses-instructors/find-all-courses-instructors.dto';

@InputType()
class WhereDataFindAllCoursesInstructorsDataInput
  implements WhereDataFindAllCoursesInstructorsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCoursesInstructorsInput
  implements OrderByDataFindAllCoursesInstructorsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCoursesInstructorsInput extends WherePaginated(
  WhereDataFindAllCoursesInstructorsDataInput
) {}
