import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataIntInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { PlanStatus } from '@/controllers/graphql/enums/plan-status.enum';
import { PlanType } from '@/controllers/graphql/enums/plan-type.enum';
import {
  OrderByDataFindAllPlansDTO,
  WhereDataFindAllPlansDTO
} from '@/dtos/plans/find-all-plans.dto';

@InputType()
class WhereDataFindAllPlansDataInput implements WhereDataFindAllPlansDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  name?: WhereDataSearchInput;

  @Field(() => PlanType, { nullable: true })
  type?: PlanType;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  checkoutVisible?: WhereDataBooleanInput;

  @Field(() => PlanStatus, { nullable: true })
  status?: PlanStatus;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  hasCustomDomain?: WhereDataBooleanInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  hasCustomSite?: WhereDataBooleanInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  quantityCourses?: WhereDataIntInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  quantityInstructorPerCourses?: WhereDataIntInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  quantityClassroomsPerCourses?: WhereDataIntInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  quantityModulesPerClassrooms?: WhereDataIntInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  quantityVideosPerModules?: WhereDataIntInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  applicationFeePercentage?: WhereDataIntInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllPlansInput
  implements OrderByDataFindAllPlansDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  type?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  checkoutVisible?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  hasCustomDomain?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  hasCustomSite?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantityCourses?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantityInstructorPerCourses?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantityClassroomsPerCourses?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantityModulesPerClassrooms?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantityVideosPerModules?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  applicationFeePercentage?: OrderBy;

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
export class WhereDataFindAllPlansInput extends WherePaginated(
  WhereDataFindAllPlansDataInput
) {}
