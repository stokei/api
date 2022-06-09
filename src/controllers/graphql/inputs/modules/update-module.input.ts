import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataModuleInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereModuleInput {
  @Field()
  moduleId: string;
}

@InputType()
export class UpdateModuleInput {
  @Field(() => UpdateDataModuleInput)
  data: UpdateDataModuleInput;

  @Field(() => UpdateWhereModuleInput)
  where: UpdateWhereModuleInput;
}
