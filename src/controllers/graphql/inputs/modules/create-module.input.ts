import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateModuleInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
