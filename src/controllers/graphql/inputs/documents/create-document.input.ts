import { Field, InputType } from '@nestjs/graphql';

import { DocumentType } from '@/controllers/graphql/enums/document-type.enum';

@InputType()
export class CreateDocumentInput {
  @Field(() => String)
  document: string;

  @Field(() => DocumentType)
  type: DocumentType;
}
