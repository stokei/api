import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataModulesVideoInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereModulesVideoInput {
  @Field()
  modulesVideoId: string;
}

@InputType()
export class UpdateModulesVideoInput {
  @Field(() => UpdateDataModulesVideoInput)
  data: UpdateDataModulesVideoInput;

  @Field(() => UpdateWhereModulesVideoInput)
  where: UpdateWhereModulesVideoInput;
}
