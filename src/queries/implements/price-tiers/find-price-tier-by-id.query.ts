import { IQuery } from '@nestjs/cqrs';

export class FindPriceTierByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
