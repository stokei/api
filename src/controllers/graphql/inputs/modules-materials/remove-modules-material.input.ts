import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereModulesMaterialInput {
  @Field()
  modulesMaterialId: string;
}

@InputType()
export class RemoveModulesMaterialInput {
  @Field(() => RemoveWhereModulesMaterialInput)
  where: RemoveWhereModulesMaterialInput;
}
