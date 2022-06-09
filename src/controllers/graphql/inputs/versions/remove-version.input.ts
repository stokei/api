import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereVersionInput {
  @Field()
  versionId: string;
}

@InputType()
export class RemoveVersionInput {
  @Field(() => RemoveWhereVersionInput)
  where: RemoveWhereVersionInput;
}
