import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataVersionInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereVersionInput {
  @Field()
  versionId: string;
}

@InputType()
export class UpdateVersionInput {
  @Field(() => UpdateDataVersionInput)
  data: UpdateDataVersionInput;

  @Field(() => UpdateWhereVersionInput)
  where: UpdateWhereVersionInput;
}
