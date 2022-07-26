import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataModuleInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
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
