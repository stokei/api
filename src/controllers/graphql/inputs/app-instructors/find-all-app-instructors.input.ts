import { Field, InputType } from '@nestjs/graphql';
import { OrderBy, WhereDataStringInput, WherePaginated } from '@stokei/nestjs';

import {
  OrderByDataFindAllAppInstructorsDTO,
  WhereDataFindAllAppInstructorsDTO
} from '@/dtos/app-instructors/find-all-app-instructors.dto';

@InputType()
class WhereDataFindAllAppInstructorsDataInput
  implements WhereDataFindAllAppInstructorsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  instructor?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllAppInstructorsInput
  implements OrderByDataFindAllAppInstructorsDTO
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
export class WhereDataFindAllAppInstructorsInput extends WherePaginated(
  WhereDataFindAllAppInstructorsDataInput
) {}
