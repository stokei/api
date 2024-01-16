import { DocumentType } from '@/enums/document-type.enum';

export interface PagarmeCustomer {
  id: string;
  name: string;
  email: string;
  code: string;
  document: string;
  document_type: DocumentType;
  type: string;
  gender: string;
  delinquent: boolean;
  created_at: string;
  updated_at: string;
  birthdate: string;
  phones: {
    mobile_phone: {
      country_code: string;
      number: string;
      area_code: string;
    };
  };
}
