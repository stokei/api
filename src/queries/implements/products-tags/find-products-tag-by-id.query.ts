import { IQuery } from '@nestjs/cqrs';

export class FindProductsTagByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
