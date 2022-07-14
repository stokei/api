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
} from '@/dtos/classroom-modules/find-all-classroom-modules.dto';

@InputType()
class WhereDataFindAllClassroomModulesDataInput
  implements WhereDataFindAllClassroomModulesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  classroom?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;

  @Field({ nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field({ nullable: true })
  createdBy?: WhereDataStringInput;
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
