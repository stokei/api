import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllProjectsPlansDTO,
  WhereDataFindAllProjectsPlansDTO
} from '@/dtos/projects-plans/find-all-projects-plans.dto';

@InputType()
class WhereDataFindAllProjectsPlansDataInput
  implements WhereDataFindAllProjectsPlansDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllProjectsPlansInput
  implements OrderByDataFindAllProjectsPlansDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllProjectsPlansInput extends WherePaginated(
  WhereDataFindAllProjectsPlansDataInput
) {}
