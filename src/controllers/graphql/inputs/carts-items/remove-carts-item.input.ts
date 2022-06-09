import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCartsItemInput {
  @Field()
  cartsItemId: string;
}

@InputType()
export class RemoveCartsItemInput {
  @Field(() => RemoveWhereCartsItemInput)
  where: RemoveWhereCartsItemInput;
}
