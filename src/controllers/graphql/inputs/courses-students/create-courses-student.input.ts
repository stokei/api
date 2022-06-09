import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCoursesStudentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
