import {
  OrderByDataFindAllClassroomsPlansDTO,
  WhereDataFindAllClassroomsPlansDTO
} from '@/dtos/classrooms-plans/find-all-classrooms-plans.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllClassroomsPlansDataInput
  implements WhereDataFindAllClassroomsPlansDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomsPlansInput
  implements OrderByDataFindAllClassroomsPlansDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomsPlansInput extends WherePaginated(
  WhereDataFindAllClassroomsPlansDataInput
) {}
