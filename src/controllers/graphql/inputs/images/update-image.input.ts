import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataImageInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereImageInput {
  @Field()
  image: string;
}

@InputType()
export class UpdateImageInput {
  @Field(() => UpdateDataImageInput)
  data: UpdateDataImageInput;

  @Field(() => UpdateWhereImageInput)
  where: UpdateWhereImageInput;
}
