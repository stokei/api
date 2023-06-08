import { IQuery } from '@nestjs/cqrs';

import { FindAccountByEmailAndAppDTO } from '@/dtos/accounts/find-account-by-email-and-app.dto';

export class FindAccountByEmailAndAppQuery implements IQuery {
  app: string;
  email: string;
  constructor(readonly data: FindAccountByEmailAndAppDTO) {
    this.app = data.app;
    this.email = data.email;
  }
}
