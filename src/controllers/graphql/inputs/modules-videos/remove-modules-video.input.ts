import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereModulesVideoInput {
  @Field()
  modulesVideoId: string;
}

@InputType()
export class RemoveModulesVideoInput {
  @Field(() => RemoveWhereModulesVideoInput)
  where: RemoveWhereModulesVideoInput;
}
