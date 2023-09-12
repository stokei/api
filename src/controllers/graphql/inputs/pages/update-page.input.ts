import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataPageInput {
  @Field(() => String, { nullable: true })
  title?: string;
}

@InputType()
export class UpdateWherePageInput {
  @Field()
  page: string;
}

@InputType()
export class UpdatePageInput {
  @Field(() => UpdateDataPageInput)
  data: UpdateDataPageInput;

  @Field(() => UpdateWherePageInput)
  where: UpdateWherePageInput;
}
