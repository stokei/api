import { IQuery } from '@nestjs/cqrs';

export class FindOrdersSellerByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
