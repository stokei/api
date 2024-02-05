import { CreateDocumentDTO } from '@/dtos/documents/create-document.dto';
import { CreatePhoneDTO } from '@/dtos/phones/create-phone.dto';

export interface UpdateAccountPagarmeCustomerDTO {
  app: string;
  account: string;
  dateBirthday?: string;
  document?: CreateDocumentDTO;
  phone?: CreatePhoneDTO;
  updatedBy: string;
}
