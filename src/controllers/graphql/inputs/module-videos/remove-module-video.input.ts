import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereModuleVideoInput {
  @Field()
  module: string;

  @Field()
  video: string;
}

@InputType()
export class RemoveModuleVideoInput {
  @Field(() => RemoveWhereModuleVideoInput)
  where: RemoveWhereModuleVideoInput;
}
