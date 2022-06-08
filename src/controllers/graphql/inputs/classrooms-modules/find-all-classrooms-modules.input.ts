import {
  OrderByDataFindAllClassroomsModulesDTO,
  WhereDataFindAllClassroomsModulesDTO
} from '@/dtos/classrooms-modules/find-all-classrooms-modules.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllClassroomsModulesDataInput
  implements WhereDataFindAllClassroomsModulesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomsModulesInput
  implements OrderByDataFindAllClassroomsModulesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomsModulesInput extends WherePaginated(
  WhereDataFindAllClassroomsModulesDataInput
) {}
