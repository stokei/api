import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataPageInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWherePageInput {
  @Field()
  pageId: string;
}

@InputType()
export class UpdatePageInput {
  @Field(() => UpdateDataPageInput)
  data: UpdateDataPageInput;

  @Field(() => UpdateWherePageInput)
  where: UpdateWherePageInput;
}
