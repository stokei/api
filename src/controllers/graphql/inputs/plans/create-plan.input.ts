import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePlanInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
