import { DocumentType } from '@/enums/document-type.enum';

export interface CreateDocumentDTO {
  document: string;
  type: DocumentType;
}
