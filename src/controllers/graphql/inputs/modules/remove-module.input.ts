import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereModuleInput {
  @Field()
  moduleId: string;
}

@InputType()
export class RemoveModuleInput {
  @Field(() => RemoveWhereModuleInput)
  where: RemoveWhereModuleInput;
}
