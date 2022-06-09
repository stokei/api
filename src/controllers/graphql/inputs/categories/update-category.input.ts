import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCategoryInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCategoryInput {
  @Field()
  categoryId: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => UpdateDataCategoryInput)
  data: UpdateDataCategoryInput;

  @Field(() => UpdateWhereCategoryInput)
  where: UpdateWhereCategoryInput;
}
