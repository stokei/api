import { ICommand } from '@nestjs/cqrs';

import { ChangePasswordDTO } from '@/dtos/accounts/change-password.dto';

export class ChangePasswordCommand implements ICommand, ChangePasswordDTO {
  code: string;
  password: string;
  email: string;

  constructor(data: ChangePasswordDTO) {
    this.code = data?.code;
    this.password = data?.password;
    this.email = data?.email;
  }
}
