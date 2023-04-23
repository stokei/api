import { IQuery } from '@nestjs/cqrs';

export class FindProductsByStripeProductIdsQuery implements IQuery {
  constructor(readonly ids: string[]) {}
}
