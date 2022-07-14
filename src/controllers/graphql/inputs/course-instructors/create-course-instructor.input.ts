import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseInstructorInput {
  @Field()
  course: string;

  @Field()
  name: string;
}
