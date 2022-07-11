import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCourseStudentInput {
  @Field()
  courseStudentId: string;
}

@InputType()
export class RemoveCourseStudentInput {
  @Field(() => RemoveWhereCourseStudentInput)
  where: RemoveWhereCourseStudentInput;
}
