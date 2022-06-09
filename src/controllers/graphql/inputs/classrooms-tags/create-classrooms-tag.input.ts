import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsTagInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
