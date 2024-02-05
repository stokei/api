import { registerEnumType } from '@nestjs/graphql';

import { DocumentType } from '@/enums/document-type.enum';

registerEnumType(DocumentType, {
  name: 'DocumentType'
});

export { DocumentType };
