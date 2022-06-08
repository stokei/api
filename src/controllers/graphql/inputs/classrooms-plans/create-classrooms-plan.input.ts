import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsPlanInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
