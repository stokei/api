import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataFileInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereFileInput {
  @Field()
  fileId: string;
}

@InputType()
export class UpdateFileInput {
  @Field(() => UpdateDataFileInput)
  data: UpdateDataFileInput;

  @Field(() => UpdateWhereFileInput)
  where: UpdateWhereFileInput;
}
