import { IQuery } from '@nestjs/cqrs';

export class FindPriceByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
