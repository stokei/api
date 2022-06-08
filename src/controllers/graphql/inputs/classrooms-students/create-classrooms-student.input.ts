import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsStudentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
