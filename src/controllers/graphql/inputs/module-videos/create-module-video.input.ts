import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateModuleVideoInput {
  @Field()
  module: string;

  @Field()
  video: string;
}
