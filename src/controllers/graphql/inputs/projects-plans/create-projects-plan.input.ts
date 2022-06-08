import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectsPlanInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
