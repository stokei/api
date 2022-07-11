import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomInstructorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
