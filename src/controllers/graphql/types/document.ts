import { Field, ObjectType } from '@nestjs/graphql';

import { DocumentType } from '@/controllers/graphql/enums/document-type.enum';

@ObjectType()
export class Document {
  @Field(() => String)
  document: string;

  @Field(() => DocumentType)
  type: DocumentType;
}
