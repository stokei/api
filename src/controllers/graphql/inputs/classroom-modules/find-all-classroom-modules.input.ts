import { Field, InputType } from '@nestjs/graphql';
import { OrderBy, WhereDataStringInput, WherePaginated } from '@stokei/nestjs';

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

  @Field(() => WhereDataStringInput, { nullable: true })
  classroom?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  module?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllClassroomModulesInput
  implements OrderByDataFindAllClassroomModulesDTO
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
export class WhereDataFindAllClassroomModulesInput extends WherePaginated(
  WhereDataFindAllClassroomModulesDataInput
) {}
