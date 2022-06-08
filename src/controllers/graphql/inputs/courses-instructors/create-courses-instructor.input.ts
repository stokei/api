import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCoursesInstructorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
