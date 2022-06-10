import { ICommand } from '@nestjs/cqrs';

import { LoginDTO } from '@/dtos/accounts/login.dto';

export class LoginCommand implements ICommand, LoginDTO {
  parent: string;
  email: string;
  password: string;

  constructor(data: LoginDTO) {
    this.parent = data?.parent;
    this.email = data?.email;
    this.password = data?.password;
  }
}
