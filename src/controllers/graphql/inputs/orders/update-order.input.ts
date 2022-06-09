import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataOrderInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereOrderInput {
  @Field()
  orderId: string;
}

@InputType()
export class UpdateOrderInput {
  @Field(() => UpdateDataOrderInput)
  data: UpdateDataOrderInput;

  @Field(() => UpdateWhereOrderInput)
  where: UpdateWhereOrderInput;
}
