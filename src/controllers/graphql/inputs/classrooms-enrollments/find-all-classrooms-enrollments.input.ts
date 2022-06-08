import {
  OrderByDataFindAllClassroomsEnrollmentsDTO,
  WhereDataFindAllClassroomsEnrollmentsDTO
} from '@/dtos/classrooms-enrollments/find-all-classrooms-enrollments.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllClassroomsEnrollmentsDataInput
  implements WhereDataFindAllClassroomsEnrollmentsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomsEnrollmentsInput
  implements OrderByDataFindAllClassroomsEnrollmentsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomsEnrollmentsInput extends WherePaginated(
  WhereDataFindAllClassroomsEnrollmentsDataInput
) {}
