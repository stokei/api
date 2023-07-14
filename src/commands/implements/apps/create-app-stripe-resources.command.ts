import { ICommand } from '@nestjs/cqrs';

import { CreateAppStripeResourcesDTO } from '@/dtos/apps/create-app-stripe-resources.dto';

export class CreateAppStripeResourcesCommand
  implements ICommand, CreateAppStripeResourcesDTO
{
  app: string;
  createdBy: string;

  constructor(data: CreateAppStripeResourcesDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
