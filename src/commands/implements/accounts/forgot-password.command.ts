import { ICommand } from '@nestjs/cqrs';

import { ForgotPasswordDTO } from '@/dtos/accounts/forgot-password.dto';

export class ForgotPasswordCommand implements ICommand, ForgotPasswordDTO {
  email: string;
  app: string;
  constructor(data: ForgotPasswordDTO) {
    this.email = data?.email;
    this.app = data?.app;
  }
}
