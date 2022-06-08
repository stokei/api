import {
  OrderByDataFindAllProjectsMembersDTO,
  WhereDataFindAllProjectsMembersDTO
} from '@/dtos/projects-members/find-all-projects-members.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllProjectsMembersDataInput
  implements WhereDataFindAllProjectsMembersDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllProjectsMembersInput
  implements OrderByDataFindAllProjectsMembersDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllProjectsMembersInput extends WherePaginated(
  WhereDataFindAllProjectsMembersDataInput
) {}
