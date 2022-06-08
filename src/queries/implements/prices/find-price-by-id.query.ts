import { IQuery } from '@nestjs/cqrs';

export class FindPriceByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
