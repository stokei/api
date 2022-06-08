import {
  OrderByDataFindAllActivitiesDTO,
  WhereDataFindAllActivitiesDTO
} from '@/dtos/activities/find-all-activities.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllActivitiesDataInput
  implements WhereDataFindAllActivitiesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllActivitiesInput
  implements OrderByDataFindAllActivitiesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllActivitiesInput extends WherePaginated(
  WhereDataFindAllActivitiesDataInput
) {}
