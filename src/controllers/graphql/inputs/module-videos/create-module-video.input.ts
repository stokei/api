import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateModuleVideoInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
