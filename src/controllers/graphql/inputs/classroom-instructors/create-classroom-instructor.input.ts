import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomInstructorInput {
  @Field()
  classroom: string;

  @Field()
  instructors: string;
}
