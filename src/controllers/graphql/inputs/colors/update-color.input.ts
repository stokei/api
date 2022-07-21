import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataColorInput {
  @Field()
  color?: string;
}

@InputType()
export class UpdateWhereColorInput {
  @Field()
  colorId: string;
}

@InputType()
export class UpdateColorInput {
  @Field(() => UpdateDataColorInput)
  data: UpdateDataColorInput;

  @Field(() => UpdateWhereColorInput)
  where: UpdateWhereColorInput;
}
