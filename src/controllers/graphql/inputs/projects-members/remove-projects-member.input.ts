import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereProjectsMemberInput {
  @Field()
  projectsMemberId: string;
}

@InputType()
export class RemoveProjectsMemberInput {
  @Field(() => RemoveWhereProjectsMemberInput)
  where: RemoveWhereProjectsMemberInput;
}
