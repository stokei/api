import { InputType, Field } from '@nestjs/graphql';

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
