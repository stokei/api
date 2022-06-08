import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataRatingInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereRatingInput {
  @Field()
  ratingId: string;
}

@InputType()
export class UpdateRatingInput {
  @Field(() => UpdateDataRatingInput)
  data: UpdateDataRatingInput;

  @Field(() => UpdateWhereRatingInput)
  where: UpdateWhereRatingInput;
}
