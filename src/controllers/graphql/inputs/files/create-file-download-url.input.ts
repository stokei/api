import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileDownloadURLInput {
  @Field(() => String)
  file: string;
}
