import { ICommand } from '@nestjs/cqrs';

import { SignUpDTO } from '@/dtos/accounts/signup.dto';

export class SignUpCommand implements ICommand, SignUpDTO {
  firstname: string;
  lastname: string;
  parent: string;
  email: string;
  password: string;

  constructor(data: SignUpDTO) {
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.parent = data?.parent;
    this.email = data?.email;
    this.password = data?.password;
  }
}
