import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataTagInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereTagInput {
  @Field()
  tagId: string;
}

@InputType()
export class UpdateTagInput {
  @Field(() => UpdateDataTagInput)
  data: UpdateDataTagInput;

  @Field(() => UpdateWhereTagInput)
  where: UpdateWhereTagInput;
}
