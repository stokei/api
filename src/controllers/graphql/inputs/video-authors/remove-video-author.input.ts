import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereVideoAuthorInput {
  @Field()
  videoAuthorId: string;
}

@InputType()
export class RemoveVideoAuthorInput {
  @Field(() => RemoveWhereVideoAuthorInput)
  where: RemoveWhereVideoAuthorInput;
}
