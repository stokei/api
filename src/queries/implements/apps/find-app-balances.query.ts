import { IQuery } from '@nestjs/cqrs';

import { FindAppBalancesDTO } from '@/dtos/apps/find-app-balances.dto';

export class FindAppBalancesQuery implements IQuery, FindAppBalancesDTO {
  app: string;

  constructor(data: FindAppBalancesDTO) {
    this.app = data.app;
  }
}
