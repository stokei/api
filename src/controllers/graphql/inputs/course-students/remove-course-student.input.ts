import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCourseStudentInput {
  @Field()
  course: string;

  @Field()
  student: string;
}

@InputType()
export class RemoveCourseStudentInput {
  @Field(() => RemoveWhereCourseStudentInput)
  where: RemoveWhereCourseStudentInput;
}
