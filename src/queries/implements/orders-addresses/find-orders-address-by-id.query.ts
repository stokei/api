import { IQuery } from '@nestjs/cqrs';

export class FindOrdersAddressByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
