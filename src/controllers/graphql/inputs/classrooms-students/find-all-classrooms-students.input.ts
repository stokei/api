import {
  OrderByDataFindAllClassroomsStudentsDTO,
  WhereDataFindAllClassroomsStudentsDTO
} from '@/dtos/classrooms-students/find-all-classrooms-students.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllClassroomsStudentsDataInput
  implements WhereDataFindAllClassroomsStudentsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomsStudentsInput
  implements OrderByDataFindAllClassroomsStudentsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomsStudentsInput extends WherePaginated(
  WhereDataFindAllClassroomsStudentsDataInput
) {}
