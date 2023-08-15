import { IQuery } from '@nestjs/cqrs';

export class FindOrderItemByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
