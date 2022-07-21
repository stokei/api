import { IQuery } from '@nestjs/cqrs';

export class FindSubscriptionByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
