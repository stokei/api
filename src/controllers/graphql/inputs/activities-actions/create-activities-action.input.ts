import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateActivitiesActionInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
