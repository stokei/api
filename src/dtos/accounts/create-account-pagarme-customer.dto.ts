import { CreatePhoneDTO } from '@/dtos/phones/create-phone.dto';

export interface CreateAccountPagarmeCustomerDTO {
  app: string;
  account: string;
  dateBirthday: string;
  cpf: string;
  phone: CreatePhoneDTO;
  createdBy: string;
}
