import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereImageInput {
  @Field()
  imageId: string;
}

@InputType()
export class RemoveImageInput {
  @Field(() => RemoveWhereImageInput)
  where: RemoveWhereImageInput;
}
