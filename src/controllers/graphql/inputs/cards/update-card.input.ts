import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataCardInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCardInput {
  @Field()
  cardId: string;
}

@InputType()
export class UpdateCardInput {
  @Field(() => UpdateDataCardInput)
  data: UpdateDataCardInput;

  @Field(() => UpdateWhereCardInput)
  where: UpdateWhereCardInput;
}
