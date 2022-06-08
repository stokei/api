import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataCoursesInstructorInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCoursesInstructorInput {
  @Field()
  coursesInstructorId: string;
}

@InputType()
export class UpdateCoursesInstructorInput {
  @Field(() => UpdateDataCoursesInstructorInput)
  data: UpdateDataCoursesInstructorInput;

  @Field(() => UpdateWhereCoursesInstructorInput)
  where: UpdateWhereCoursesInstructorInput;
}
