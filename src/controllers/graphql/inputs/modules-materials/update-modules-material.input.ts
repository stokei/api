import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataModulesMaterialInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereModulesMaterialInput {
  @Field()
  modulesMaterialId: string;
}

@InputType()
export class UpdateModulesMaterialInput {
  @Field(() => UpdateDataModulesMaterialInput)
  data: UpdateDataModulesMaterialInput;

  @Field(() => UpdateWhereModulesMaterialInput)
  where: UpdateWhereModulesMaterialInput;
}
