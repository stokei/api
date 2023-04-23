import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCourseInstructorInput {
  @Field()
  role: string;
}

@InputType()
export class RemoveCourseInstructorInput {
  @Field(() => RemoveWhereCourseInstructorInput)
  where: RemoveWhereCourseInstructorInput;
}
