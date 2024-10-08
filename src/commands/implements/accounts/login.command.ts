import { ICommand } from '@nestjs/cqrs';

import { LoginDTO } from '@/dtos/accounts/login.dto';

export class LoginCommand implements ICommand, LoginDTO {
  app: string;
  email: string;
  password: string;

  constructor(data: LoginDTO) {
    this.app = data?.app;
    this.email = data?.email;
    this.password = data?.password;
  }
}
