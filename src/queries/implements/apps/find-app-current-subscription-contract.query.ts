import { IQuery } from '@nestjs/cqrs';

export class FindAppCurrentSubscriptionContractQuery implements IQuery {
  constructor(readonly app: string) {}
}
