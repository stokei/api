import { ICommand } from '@nestjs/cqrs';

import { UpdateAccountPagarmeCustomerDTO } from '@/dtos/accounts/update-account-pagarme-customer.dto';
import { CreateDocumentDTO } from '@/dtos/documents/create-document.dto';
import { CreatePhoneDTO } from '@/dtos/phones/create-phone.dto';

export class UpdateAccountPagarmeCustomerCommand
  implements ICommand, UpdateAccountPagarmeCustomerDTO
{
  app: string;
  account: string;
  dateBirthday?: string;
  document?: CreateDocumentDTO;
  phone?: CreatePhoneDTO;
  updatedBy: string;

  constructor(data: UpdateAccountPagarmeCustomerDTO) {
    this.app = data.app;
    this.account = data.account;
    this.dateBirthday = data.dateBirthday;
    this.document = data.document;
    this.phone = data.phone;
    this.updatedBy = data.updatedBy;
  }
}
