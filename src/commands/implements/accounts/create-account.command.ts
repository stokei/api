import { ICommand } from '@nestjs/cqrs';

import { CreateAccountDTO } from '@/dtos/accounts/create-account.dto';

export class CreateAccountCommand implements ICommand, CreateAccountDTO {
  app: string;
  createdBy: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(data: CreateAccountDTO) {
    this.createdBy = data?.createdBy;
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.app = data?.app;
    this.email = data?.email;
    this.password = data?.password;
  }
}
