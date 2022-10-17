import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePlanInput {
  @Field(() => Boolean)
  hasCustomDomain: boolean;

  @Field(() => Boolean)
  hasCustomSite: boolean;

  @Field(() => Int)
  quantityCourses: number;

  @Field(() => Int)
  quantityInstructorsPerCourse: number;

  @Field(() => Int)
  quantityClassroomsPerCourses: number;

  @Field(() => Int)
  quantityModulesPerCourse: number;

  @Field(() => Int)
  quantityVideosPerModules: number;
}
