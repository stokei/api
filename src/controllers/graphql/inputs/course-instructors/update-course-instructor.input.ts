import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCourseInstructorInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCourseInstructorInput {
  @Field()
  courseInstructorId: string;
}

@InputType()
export class UpdateCourseInstructorInput {
  @Field(() => UpdateDataCourseInstructorInput)
  data: UpdateDataCourseInstructorInput;

  @Field(() => UpdateWhereCourseInstructorInput)
  where: UpdateWhereCourseInstructorInput;
}
