import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomStudentsDTO,
  WhereDataFindAllClassroomStudentsDTO
} from '@/dtos/classroom-students/find-all-classroom-students.dto';

@InputType()
class WhereDataFindAllClassroomStudentsDataInput
  implements WhereDataFindAllClassroomStudentsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;

  @Field({ nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field({ nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllClassroomStudentsInput
  implements OrderByDataFindAllClassroomStudentsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomStudentsInput extends WherePaginated(
  WhereDataFindAllClassroomStudentsDataInput
) {}
