import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsStudentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
