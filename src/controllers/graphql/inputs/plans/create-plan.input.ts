import { Field, InputType, Int } from '@nestjs/graphql';

import { PlanType } from '@/controllers/graphql/enums/plan-type.enum';

@InputType()
export class CreatePlanInput {
  @Field()
  name: string;

  @Field(() => PlanType)
  type: PlanType;

  @Field(() => Boolean)
  checkoutVisible: boolean;

  @Field(() => Boolean)
  allowedToSell: boolean;

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
}
