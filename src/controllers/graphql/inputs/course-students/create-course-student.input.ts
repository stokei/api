import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseStudentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
