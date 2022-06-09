import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCartsItemInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCartsItemInput {
  @Field()
  cartsItemId: string;
}

@InputType()
export class UpdateCartsItemInput {
  @Field(() => UpdateDataCartsItemInput)
  data: UpdateDataCartsItemInput;

  @Field(() => UpdateWhereCartsItemInput)
  where: UpdateWhereCartsItemInput;
}
