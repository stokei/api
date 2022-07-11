import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataModuleVideoInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereModuleVideoInput {
  @Field()
  moduleVideoId: string;
}

@InputType()
export class UpdateModuleVideoInput {
  @Field(() => UpdateDataModuleVideoInput)
  data: UpdateDataModuleVideoInput;

  @Field(() => UpdateWhereModuleVideoInput)
  where: UpdateWhereModuleVideoInput;
}
