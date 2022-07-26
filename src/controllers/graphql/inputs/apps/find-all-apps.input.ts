import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { AppStatus } from '@/controllers/graphql/enums/app-status.enum';
import {
  OrderByDataFindAllAppsDTO,
  WhereDataFindAllAppsDTO
} from '@/dtos/apps/find-all-apps.dto';

@InputType()
class WhereDataFindAllAppsDataInput implements WhereDataFindAllAppsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  name?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  description?: WhereDataSearchInput;

  @Field(() => AppStatus, { nullable: true })
  status?: AppStatus;

  @Field(() => WhereDataStringInput, { nullable: true })
  plan?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  currency?: WhereDataStringInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllAppsInput implements OrderByDataFindAllAppsDTO {
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  slug?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  plan?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  currency?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  active?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  blockedAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  activatedAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  deactivatedAt?: OrderBy;

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
export class WhereDataFindAllAppsInput extends WherePaginated(
  WhereDataFindAllAppsDataInput
) {}
