import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsModuleInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
