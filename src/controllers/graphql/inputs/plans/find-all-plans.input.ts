import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataIntInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllPlansDTO,
  WhereDataFindAllPlansDTO
} from '@/dtos/plans/find-all-plans.dto';

@InputType()
class WhereDataFindAllPlansDataInput implements WhereDataFindAllPlansDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  name?: WhereDataStringInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  hasCustomDomain?: WhereDataBooleanInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  hasCustomSite?: WhereDataBooleanInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  quantityCourses?: WhereDataIntInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  quantityInstructorsPerCourse?: WhereDataIntInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  quantityClassroomsPerCourses?: WhereDataIntInput;

  @Field(() => WhereDataIntInput, { nullable: true })
  quantityModulesPerCourse?: WhereDataIntInput;

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
  active?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  hasCustomDomain?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  hasCustomSite?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantityCourses?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantityInstructorsPerCourse?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantityClassroomsPerCourses?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  quantityModulesPerCourse?: OrderBy;

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
