import { IQuery } from '@nestjs/cqrs';

export class FindSortedItemByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
