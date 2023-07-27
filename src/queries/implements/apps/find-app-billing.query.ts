import { IQuery } from '@nestjs/cqrs';

import { FindAppBillingDTO } from '@/dtos/apps/find-app-billing.dto';

export class FindAppBillingQuery implements IQuery, FindAppBillingDTO {
  app: string;

  constructor(data: FindAppBillingDTO) {
    this.app = data.app;
  }
}
