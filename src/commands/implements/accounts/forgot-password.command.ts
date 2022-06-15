import { ICommand } from '@nestjs/cqrs';

import { ForgotPasswordDTO } from '@/dtos/accounts/forgot-password.dto';

export class ForgotPasswordCommand implements ICommand, ForgotPasswordDTO {
  email: string;
  parent: string;
  constructor(data: ForgotPasswordDTO) {
    this.email = data?.email;
    this.parent = data?.parent;
  }
}
