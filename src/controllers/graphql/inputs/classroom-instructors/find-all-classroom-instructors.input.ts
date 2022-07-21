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
  classroom?: WhereDataStringInput;

  @Field({ nullable: true })
  instructors?: WhereDataSearchInput;

  @Field({ nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field({ nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllClassroomInstructorsInput
  implements OrderByDataFindAllClassroomInstructorsDTO
{
  @Field(() => OrderBy, { nullable: true })
  instructors?: OrderBy;

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
export class WhereDataFindAllClassroomInstructorsInput extends WherePaginated(
  WhereDataFindAllClassroomInstructorsDataInput
) {}
