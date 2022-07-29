import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereImageInput {
  @Field()
  image: string;
}

@InputType()
export class RemoveImageInput {
  @Field(() => RemoveWhereImageInput)
  where: RemoveWhereImageInput;
}
