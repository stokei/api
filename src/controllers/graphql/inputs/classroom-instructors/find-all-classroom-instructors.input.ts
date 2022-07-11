import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomInstructorsDTO,
  WhereDataFindAllClassroomInstructorsDTO
} from '@/dtos/classroom-instructors/find-all-classroom-instructors.dto';

@InputType()
class WhereDataFindAllClassroomInstructorsDataInput
  implements WhereDataFindAllClassroomInstructorsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomInstructorsInput
  implements OrderByDataFindAllClassroomInstructorsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomInstructorsInput extends WherePaginated(
  WhereDataFindAllClassroomInstructorsDataInput
) {}
