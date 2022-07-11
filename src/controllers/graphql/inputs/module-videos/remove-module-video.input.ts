import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereModuleVideoInput {
  @Field()
  moduleVideoId: string;
}

@InputType()
export class RemoveModuleVideoInput {
  @Field(() => RemoveWhereModuleVideoInput)
  where: RemoveWhereModuleVideoInput;
}
