import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCardInput {
  @Field()
  cardId: string;
}

@InputType()
export class RemoveCardInput {
  @Field(() => RemoveWhereCardInput)
  where: RemoveWhereCardInput;
}
