import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsAdminInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
