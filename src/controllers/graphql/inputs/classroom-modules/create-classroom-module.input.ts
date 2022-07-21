import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomModuleInput {
  @Field()
  classroom: string;

  @Field()
  module: string;
}
