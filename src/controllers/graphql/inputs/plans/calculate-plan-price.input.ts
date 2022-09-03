import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CalculatePlanPriceInput {
  @Field(() => String)
  currency: string;

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
}
