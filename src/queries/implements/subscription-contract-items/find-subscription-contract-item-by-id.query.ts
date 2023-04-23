import { IQuery } from '@nestjs/cqrs';

export class FindSubscriptionContractItemByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
