import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereRatingInput {
  @Field()
  ratingId: string;
}

@InputType()
export class RemoveRatingInput {
  @Field(() => RemoveWhereRatingInput)
  where: RemoveWhereRatingInput;
}
