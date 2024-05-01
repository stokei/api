import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataVersionInput {
  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class UpdateWhereVersionInput {
  @Field()
  version: string;
}

@InputType()
export class UpdateVersionInput {
  @Field(() => UpdateDataVersionInput)
  data: UpdateDataVersionInput;

  @Field(() => UpdateWhereVersionInput)
  where: UpdateWhereVersionInput;
}
