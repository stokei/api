import { ICommand } from '@nestjs/cqrs';

import { SignUpDTO } from '@/dtos/accounts/signup.dto';

export class SignUpCommand implements ICommand, SignUpDTO {
  firstname: string;
  lastname: string;
  app: string;
  email: string;
  password: string;

  constructor(data: SignUpDTO) {
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.app = data?.app;
    this.email = data?.email;
    this.password = data?.password;
  }
}
