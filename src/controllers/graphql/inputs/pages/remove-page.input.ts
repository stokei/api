import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePageInput {
  @Field()
  page: string;
}

@InputType()
export class RemovePageInput {
  @Field(() => RemoveWherePageInput)
  where: RemoveWherePageInput;
}
