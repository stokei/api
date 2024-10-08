import { Field, ObjectType } from '@nestjs/graphql';

import { File } from './file';

@ObjectType()
export class CreateFileUploadURLResponse {
  @Field(() => File)
  file: File;

  @Field(() => String)
  uploadURL: string;
}
