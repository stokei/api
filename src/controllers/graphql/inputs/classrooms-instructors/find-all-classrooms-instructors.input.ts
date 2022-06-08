import {
  OrderByDataFindAllClassroomsInstructorsDTO,
  WhereDataFindAllClassroomsInstructorsDTO
} from '@/dtos/classrooms-instructors/find-all-classrooms-instructors.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllClassroomsInstructorsDataInput
  implements WhereDataFindAllClassroomsInstructorsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomsInstructorsInput
  implements OrderByDataFindAllClassroomsInstructorsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomsInstructorsInput extends WherePaginated(
  WhereDataFindAllClassroomsInstructorsDataInput
) {}
