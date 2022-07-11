import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomModulesDTO,
  WhereDataFindAllClassroomModulesDTO
} from '@/dtos/classroom-module s/find-all-classroom-module s.dto';

@InputType()
class WhereDataFindAllClassroomModulesDataInput
  implements WhereDataFindAllClassroomModulesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomModulesInput
  implements OrderByDataFindAllClassroomModulesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomModulesInput extends WherePaginated(
  WhereDataFindAllClassroomModulesDataInput
) {}
