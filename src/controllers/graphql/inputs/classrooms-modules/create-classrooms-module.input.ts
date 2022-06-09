import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsModuleInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
