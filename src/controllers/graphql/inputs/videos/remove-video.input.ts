import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereVideoInput {
  @Field()
  videoId: string;
}

@InputType()
export class RemoveVideoInput {
  @Field(() => RemoveWhereVideoInput)
  where: RemoveWhereVideoInput;
}
