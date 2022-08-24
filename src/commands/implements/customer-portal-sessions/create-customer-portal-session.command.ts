import { ICommand } from '@nestjs/cqrs';

import { CreateCustomerPortalSessionDTO } from '@/dtos/customer-portal-sessions/create-customer-portal-session.dto';

export class CreateCustomerPortalSessionCommand
  implements ICommand, CreateCustomerPortalSessionDTO
{
  returnUrl: string;
  customer: string;
  app: string;
  constructor(data: CreateCustomerPortalSessionDTO) {
    this.returnUrl = data.returnUrl;
    this.customer = data.customer;
    this.app = data.app;
  }
}
