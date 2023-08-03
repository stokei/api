import { PhoneModel } from '@/models/phone.model';

export interface CreatePagarmeCustomerDTO {
  account: string;
  name: string;
  dateBirthday: string;
  email: string;
  cpf: string;
  phone: PhoneModel;
}
export interface CreatePagarmeCustomerResponse {
  id: string;
}
