import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsInstructorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
