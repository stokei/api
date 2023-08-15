import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataOrderInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateWhereOrderInput {
  @Field()
  order: string;
}

@InputType()
export class UpdateOrderInput {
  @Field(() => UpdateDataOrderInput)
  data: UpdateDataOrderInput;

  @Field(() => UpdateWhereOrderInput)
  where: UpdateWhereOrderInput;
}
