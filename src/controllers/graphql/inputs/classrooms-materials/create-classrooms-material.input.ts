import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsMaterialInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
