import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCourseInstructorInput {
  @Field()
  course: string;

  @Field()
  instructor: string;
}

@InputType()
export class RemoveCourseInstructorInput {
  @Field(() => RemoveWhereCourseInstructorInput)
  where: RemoveWhereCourseInstructorInput;
}
