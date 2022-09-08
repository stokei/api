import { IQuery } from '@nestjs/cqrs';

export class FindPricesByStripePriceIdsQuery implements IQuery {
  constructor(readonly ids: string[]) {}
}
