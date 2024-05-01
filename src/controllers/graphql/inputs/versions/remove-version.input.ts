import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereVersionInput {
  @Field()
  version: string;
}

@InputType()
export class RemoveVersionInput {
  @Field(() => RemoveWhereVersionInput)
  where: RemoveWhereVersionInput;
}
