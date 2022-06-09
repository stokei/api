import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereFileInput {
  @Field()
  fileId: string;
}

@InputType()
export class RemoveFileInput {
  @Field(() => RemoveWhereFileInput)
  where: RemoveWhereFileInput;
}
