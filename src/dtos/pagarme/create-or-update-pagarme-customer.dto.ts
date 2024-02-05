import { CreateDocumentDTO } from '@/dtos/documents/create-document.dto';
import { PhoneModel } from '@/models/phone.model';

export interface CreateOrUpdatePagarmeCustomerDTO {
  account: string;
  name: string;
  dateBirthday: string;
  email: string;
  document: CreateDocumentDTO;
  phone: PhoneModel;
}
export interface CreateOrUpdatePagarmeCustomerResponse {
  id: string;
}
