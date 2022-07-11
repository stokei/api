import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseInstructorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
