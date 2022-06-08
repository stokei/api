import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataProjectsMemberInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereProjectsMemberInput {
  @Field()
  projectsMemberId: string;
}

@InputType()
export class UpdateProjectsMemberInput {
  @Field(() => UpdateDataProjectsMemberInput)
  data: UpdateDataProjectsMemberInput;

  @Field(() => UpdateWhereProjectsMemberInput)
  where: UpdateWhereProjectsMemberInput;
}
