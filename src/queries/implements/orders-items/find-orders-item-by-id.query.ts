import { IQuery } from '@nestjs/cqrs';

export class FindOrdersItemByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
