import { Field, InputType } from '@nestjs/graphql';
import { OrderBy, WhereDataStringInput, WherePaginated } from '@stokei/nestjs';

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

  @Field(() => WhereDataStringInput, { nullable: true })
  classroom?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  student?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllClassroomStudentsInput
  implements OrderByDataFindAllClassroomStudentsDTO
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
export class WhereDataFindAllClassroomStudentsInput extends WherePaginated(
  WhereDataFindAllClassroomStudentsDataInput
) {}
