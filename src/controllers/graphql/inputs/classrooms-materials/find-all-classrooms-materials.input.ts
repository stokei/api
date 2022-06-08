import {
  OrderByDataFindAllClassroomsMaterialsDTO,
  WhereDataFindAllClassroomsMaterialsDTO
} from '@/dtos/classrooms-materials/find-all-classrooms-materials.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllClassroomsMaterialsDataInput
  implements WhereDataFindAllClassroomsMaterialsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomsMaterialsInput
  implements OrderByDataFindAllClassroomsMaterialsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomsMaterialsInput extends WherePaginated(
  WhereDataFindAllClassroomsMaterialsDataInput
) {}
