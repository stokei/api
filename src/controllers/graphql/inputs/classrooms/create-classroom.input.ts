import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
