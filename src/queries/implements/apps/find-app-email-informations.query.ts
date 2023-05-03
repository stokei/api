import { IQuery } from '@nestjs/cqrs';

import { FindAppEmailInformationsDTO } from '@/dtos/apps/find-app-email-informations.dto';

export class FindAppEmailInformationsQuery
  implements IQuery, FindAppEmailInformationsDTO
{
  app: string;

  constructor(data: FindAppEmailInformationsDTO) {
    this.app = data.app;
  }
}
