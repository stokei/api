import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectsPlanInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
