import { ICommand } from '@nestjs/cqrs';

import { CreateAccountPagarmeCustomerDTO } from '@/dtos/accounts/create-account-pagarme-customer.dto';
import { CreatePhoneDTO } from '@/dtos/phones/create-phone.dto';

export class CreateAccountPagarmeCustomerCommand
  implements ICommand, CreateAccountPagarmeCustomerDTO
{
  app: string;
  account: string;
  dateBirthday: string;
  cpf: string;
  phone: CreatePhoneDTO;
  createdBy: string;

  constructor(data: CreateAccountPagarmeCustomerDTO) {
    this.app = data.app;
    this.account = data.account;
    this.dateBirthday = data.dateBirthday;
    this.cpf = data.cpf;
    this.phone = data.phone;
    this.createdBy = data.createdBy;
  }
}
