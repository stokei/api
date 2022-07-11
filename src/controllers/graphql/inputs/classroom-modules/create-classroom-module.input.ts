import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomModuleInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
