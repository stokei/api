import { IQuery } from '@nestjs/cqrs';

export class FindSubscriptionByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
