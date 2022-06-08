import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCoursesStudentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
