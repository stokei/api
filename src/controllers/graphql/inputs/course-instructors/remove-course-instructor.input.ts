import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCourseInstructorInput {
  @Field()
  courseInstructorId: string;
}

@InputType()
export class RemoveCourseInstructorInput {
  @Field(() => RemoveWhereCourseInstructorInput)
  where: RemoveWhereCourseInstructorInput;
}
