import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  defaultPrice?: string;

  @Field({ nullable: true })
  avatar?: string;
}

@InputType()
export class UpdateWhereProductInput {
  @Field()
  product: string;
}

@InputType()
export class UpdateProductInput {
  @Field(() => UpdateDataProductInput)
  data: UpdateDataProductInput;

  @Field(() => UpdateWhereProductInput)
  where: UpdateWhereProductInput;
}
