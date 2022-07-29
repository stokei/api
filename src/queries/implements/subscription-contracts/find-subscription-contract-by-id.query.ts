import { IQuery } from '@nestjs/cqrs';

export class FindSubscriptionContractByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
