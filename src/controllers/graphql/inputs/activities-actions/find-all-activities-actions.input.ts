import {
  OrderByDataFindAllActivitiesActionsDTO,
  WhereDataFindAllActivitiesActionsDTO
} from '@/dtos/activities-actions/find-all-activities-actions.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllActivitiesActionsDataInput
  implements WhereDataFindAllActivitiesActionsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllActivitiesActionsInput
  implements OrderByDataFindAllActivitiesActionsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllActivitiesActionsInput extends WherePaginated(
  WhereDataFindAllActivitiesActionsDataInput
) {}
