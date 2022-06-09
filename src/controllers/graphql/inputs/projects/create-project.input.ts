import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
