import { IQuery } from '@nestjs/cqrs';

export class FindOrderItemByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
