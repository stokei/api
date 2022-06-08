import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsTagInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
