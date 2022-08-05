import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { PlanStatus } from '@/controllers/graphql/enums/plan-status.enum';
import { PlanType } from '@/controllers/graphql/enums/plan-type.enum';

import { Account } from './account';

@ObjectType()
export class Plan {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => PlanType)
  type: PlanType;

  @Field(() => Boolean)
  checkoutVisible: boolean;

  @Field(() => PlanStatus)
  status: PlanStatus;

  @Field(() => Boolean)
  hasCustomDomain: boolean;

  @Field(() => Boolean)
  hasCustomSite: boolean;

  @Field(() => Int)
  quantityCourses: number;

  @Field(() => Int)
  quantityInstructorPerCourses: number;

  @Field(() => Int)
  quantityClassroomsPerCourses: number;

  @Field(() => Int)
  quantityModulesPerClassrooms: number;

  @Field(() => Int)
  quantityVideosPerModules: number;

  @Field(() => Int)
  applicationFeePercentage: number;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String, { nullable: true })
  canceledAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;
}
