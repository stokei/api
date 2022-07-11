import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomStudentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
