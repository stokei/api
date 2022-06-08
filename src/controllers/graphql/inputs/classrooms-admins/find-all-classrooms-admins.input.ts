import {
  OrderByDataFindAllClassroomsAdminsDTO,
  WhereDataFindAllClassroomsAdminsDTO
} from '@/dtos/classrooms-admins/find-all-classrooms-admins.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllClassroomsAdminsDataInput
  implements WhereDataFindAllClassroomsAdminsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllClassroomsAdminsInput
  implements OrderByDataFindAllClassroomsAdminsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllClassroomsAdminsInput extends WherePaginated(
  WhereDataFindAllClassroomsAdminsDataInput
) {}
