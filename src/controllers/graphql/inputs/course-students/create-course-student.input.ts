import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseStudentInput {
  @Field()
  course: string;

  @Field()
  student: string;
}
