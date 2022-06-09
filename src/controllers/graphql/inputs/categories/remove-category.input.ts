import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCategoryInput {
  @Field()
  categoryId: string;
}

@InputType()
export class RemoveCategoryInput {
  @Field(() => RemoveWhereCategoryInput)
  where: RemoveWhereCategoryInput;
}
