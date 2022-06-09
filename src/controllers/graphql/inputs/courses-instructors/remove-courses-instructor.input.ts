import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCoursesInstructorInput {
  @Field()
  coursesInstructorId: string;
}

@InputType()
export class RemoveCoursesInstructorInput {
  @Field(() => RemoveWhereCoursesInstructorInput)
  where: RemoveWhereCoursesInstructorInput;
}
